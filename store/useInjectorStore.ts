import { create } from 'zustand';

export interface Option {
  value: string;
  weight: number;
}

export interface Question {
  id: string;
  title: string;
  type: number;
  options: Option[];
}

interface InjectorState {
  formUrl: string;
  targetCount: number;
  formTitle: string | null;
  questions: Question[];
  currentCount: number;
  isInjecting: boolean;
  isScraping: boolean;
  logs: string[];
  abortController: AbortController | null;
  
  setFormUrl: (url: string) => void;
  setTargetCount: (count: number) => void;
  updateOptionWeight: (questionId: string, value: string, weight: number) => void;
  scrapeForm: () => Promise<void>;
  startInjection: () => void;
  stopInjection: () => void;
  addLog: (msg: string) => void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getWeightedRandom = (options: Option[]) => {
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
  let random = Math.random() * totalWeight;
  for (const opt of options) {
    if (random < opt.weight) return opt.value;
    random -= opt.weight;
  }
  return options[0]?.value;
};

export const useInjectorStore = create<InjectorState>((set, get) => ({
  formUrl: '',
  targetCount: 50,
  formTitle: null,
  questions: [],
  currentCount: 0,
  isInjecting: false,
  isScraping: false,
  logs: [],
  abortController: null,

  setFormUrl: (url) => set({ formUrl: url }),
  setTargetCount: (count) => set({ targetCount: count }),
  
  updateOptionWeight: (questionId, value, weight) => set((state) => ({
    questions: state.questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map(o => o.value === value ? { ...o, weight } : o) }
        : q
    )
  })),

  addLog: (msg) => set((state) => ({ 
    logs: [`[${new Date().toLocaleTimeString()}] ${msg}`, ...state.logs].slice(0, 50) 
  })),

  scrapeForm: async () => {
    const { formUrl, addLog } = get();
    if (!formUrl) return;
    
    set({ isScraping: true, formTitle: null, questions: [], logs: [] });
    addLog(`Iniciando scrape: ${formUrl}`);
    
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formUrl })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Erro no scrape');
      
      set({ formTitle: data.title, questions: data.questions, isScraping: false });
      addLog(`Formulário carregado: ${data.title} (${data.questions.length} perguntas suportadas)`);
    } catch (err: any) {
      addLog(`Erro: ${err.message}`);
      set({ isScraping: false });
    }
  },

  startInjection: async () => {
    const state = get();
    if (state.isInjecting || state.currentCount >= state.targetCount || state.questions.length === 0) return;
    
    const controller = new AbortController();
    set({ isInjecting: true, abortController: controller });
    get().addLog('Iniciando injeção gradual...');

    while (get().isInjecting && get().currentCount < get().targetCount) {
      const current = get();
      
      // Sorteia as respostas baseadas nos pesos
      const answers: Record<string, string | string[]> = {};
      current.questions.forEach(q => {
        answers[q.id] = getWeightedRandom(q.options);
      });

      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: current.formUrl, answers }),
          signal: current.abortController?.signal
        });

        if (res.ok) {
          set((s) => ({ currentCount: s.currentCount + 1 }));
          get().addLog(`[200 OK] Submissão ${get().currentCount}/${current.targetCount} enviada.`);
        } else {
          get().addLog(`[ERRO] Falha ao enviar submissão (Status não OK).`);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          get().addLog('[INFO] Requisição cancelada pelo usuário.');
          break;
        } else {
          get().addLog(`[ERRO] ${err.message}`);
        }
      }

      if (get().currentCount < get().targetCount && get().isInjecting) {
        // Delay randômico entre 2500ms e 6000ms para evasão
        const delay = Math.floor(Math.random() * (6000 - 2500 + 1) + 2500);
        get().addLog(`Aguardando ${(delay / 1000).toFixed(1)}s para evasão de rate limit...`);
        
        try {
          await new Promise((resolve, reject) => {
            const timeoutId = setTimeout(resolve, delay);
            const onAbort = () => {
              clearTimeout(timeoutId);
              reject(new Error('AbortError'));
            };
            
            if (current.abortController?.signal.aborted) {
               onAbort();
            } else {
               current.abortController?.signal.addEventListener('abort', onAbort);
            }
          });
        } catch (e: any) {
           if (e.message === 'AbortError') break;
        }
      }
    }
    
    if (get().currentCount >= get().targetCount) {
      get().addLog('Injeção concluída com sucesso.');
    }
    set({ isInjecting: false, abortController: null });
  },

  stopInjection: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({ isInjecting: false, abortController: null });
    get().addLog('Injeção interrompida pelo usuário.');
  }
}));
