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
  currentQuestionIndex: number;
  currentCount: number;
  isInjecting: boolean;
  isScraping: boolean;
  logs: string[];
  abortController: AbortController | null;
  authError: string | null;
  
  setFormUrl: (url: string) => void;
  setTargetCount: (count: number) => void;
  updateOptionWeight: (questionId: string, optionValue: string, newWeight: number) => void;
  randomizeWeights: (questionId: string) => void;
  resetQuestionWeights: (questionId: string) => void;
  randomizeAll: () => void;
  resetAllWeights: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  scrapeForm: () => Promise<void>;
  startInjection: () => void;
  stopInjection: () => void;
  addLog: (msg: string) => void;
  resetApp: () => void;
  isStealthMode: boolean;
  setStealthMode: (stealth: boolean) => void;
  exportLogs: () => void;
  setAuthError: (error: string | null) => void;
}

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
  currentQuestionIndex: 0,
  currentCount: 0,
  isInjecting: false,
  isScraping: false,
  logs: [],
  abortController: null,

  resetApp: () => set({
    formUrl: '',
    targetCount: 50,
    formTitle: null,
    questions: [],
    currentQuestionIndex: 0,
    currentCount: 0,
    isInjecting: false,
    isScraping: false,
    isScraping: false,
    logs: [],
    abortController: null,
    isStealthMode: false,
    authError: null
  }),

  authError: null,
  setAuthError: (error) => set({ authError: error }),

  isStealthMode: false,
  setStealthMode: (stealth) => set({ isStealthMode: stealth }),
  
  exportLogs: () => {
    const { logs } = get();
    if (logs.length === 0) return;
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-weaver-logs-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  setFormUrl: (url) => set({ formUrl: url }),
  setTargetCount: (count) => set({ targetCount: count }),
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(state.questions.length - 1, state.currentQuestionIndex + 1)
  })),

  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
  })),

  randomizeWeights: (questionId) => set((state) => {
    const qIndex = state.questions.findIndex(q => q.id === questionId);
    if (qIndex === -1) return state;

    const question = state.questions[qIndex];
    const newOptions = [...question.options];
    
    let remaining = 100;
    for (let i = 0; i < newOptions.length - 1; i++) {
      const randomWeight = Math.floor(Math.random() * (remaining + 1));
      newOptions[i] = { ...newOptions[i], weight: randomWeight };
      remaining -= randomWeight;
    }
    newOptions[newOptions.length - 1] = { ...newOptions[newOptions.length - 1], weight: remaining };
    
    // Shuffle
    for (let i = newOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newOptions[i].weight;
      newOptions[i].weight = newOptions[j].weight;
      newOptions[j].weight = temp;
    }

    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex] = { ...question, options: newOptions };

    return { questions: updatedQuestions };
  }),

  resetQuestionWeights: (questionId) => set((state) => {
    const qIndex = state.questions.findIndex(q => q.id === questionId);
    if (qIndex === -1) return state;

    const question = state.questions[qIndex];
    const newOptions = [...question.options];
    
    const baseWeight = Math.floor(100 / newOptions.length);
    let diff = 100 - (baseWeight * newOptions.length);

    newOptions.forEach((opt, idx) => {
      newOptions[idx] = { ...opt, weight: baseWeight + (diff > 0 ? 1 : 0) };
      if (diff > 0) diff -= 1;
    });

    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex] = { ...question, options: newOptions };

    return { questions: updatedQuestions };
  }),

  randomizeAll: () => set((state) => {
    const updatedQuestions = state.questions.map(question => {
      const newOptions = [...question.options];
      let remaining = 100;
      for (let i = 0; i < newOptions.length - 1; i++) {
        const randomWeight = Math.floor(Math.random() * (remaining + 1));
        newOptions[i] = { ...newOptions[i], weight: randomWeight };
        remaining -= randomWeight;
      }
      newOptions[newOptions.length - 1] = { ...newOptions[newOptions.length - 1], weight: remaining };
      
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newOptions[i].weight;
        newOptions[i].weight = newOptions[j].weight;
        newOptions[j].weight = temp;
      }
      return { ...question, options: newOptions };
    });
    return { questions: updatedQuestions };
  }),

  resetAllWeights: () => set((state) => {
    const updatedQuestions = state.questions.map(question => {
      const newOptions = [...question.options];
      const baseWeight = Math.floor(100 / newOptions.length);
      let diff = 100 - (baseWeight * newOptions.length);

      newOptions.forEach((opt, idx) => {
        newOptions[idx] = { ...opt, weight: baseWeight + (diff > 0 ? 1 : 0) };
        if (diff > 0) diff -= 1;
      });
      return { ...question, options: newOptions };
    });
    return { questions: updatedQuestions };
  }),

  updateOptionWeight: (questionId, optionValue, newWeight) => set((state) => {
    const qIndex = state.questions.findIndex(q => q.id === questionId);
    if (qIndex === -1) return state;

    const question = state.questions[qIndex];
    const newOptions = [...question.options];
    const optionIndex = newOptions.findIndex(o => o.value === optionValue);
    
    if (optionIndex === -1) return state;

    const clampedWeight = Math.min(100, Math.max(0, newWeight));
    const oldWeight = newOptions[optionIndex].weight;
    const delta = clampedWeight - oldWeight;

    if (delta === 0) return state;

    newOptions[optionIndex] = { ...newOptions[optionIndex], weight: clampedWeight };

    const otherOptionsIndices = newOptions.map((_, i) => i).filter(i => i !== optionIndex);
    
    if (otherOptionsIndices.length > 0) {
      const totalOtherWeight = otherOptionsIndices.reduce((sum, idx) => sum + newOptions[idx].weight, 0);
      const exactWeights: Record<number, number> = {};
      
      otherOptionsIndices.forEach(idx => {
        let adjustment = 0;
        if (totalOtherWeight === 0) {
          adjustment = delta / otherOptionsIndices.length;
        } else {
          adjustment = delta * (newOptions[idx].weight / totalOtherWeight);
        }
        exactWeights[idx] = newOptions[idx].weight - adjustment;
        newOptions[idx] = { ...newOptions[idx], weight: Math.floor(exactWeights[idx]) };
      });

      let diff = 100 - newOptions.reduce((sum, opt) => sum + opt.weight, 0);

      const remainders = otherOptionsIndices.map(idx => ({
        idx,
        remainder: exactWeights[idx] - newOptions[idx].weight
      })).sort((a, b) => b.remainder - a.remainder);

      let i = 0;
      while (diff > 0 && i < remainders.length) {
        newOptions[remainders[i].idx].weight += 1;
        diff -= 1;
        i++;
      }
    }

    const updatedQuestions = [...state.questions];
    updatedQuestions[qIndex] = { ...question, options: newOptions };

    return { questions: updatedQuestions };
  }),

  addLog: (msg) => set((state) => ({ 
    logs: [...state.logs, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-100) 
  })),

  scrapeForm: async () => {
    const { formUrl, addLog } = get();
    
    const isValidUrl = /^https:\/\/(forms\.gle\/[a-zA-Z0-9_-]+|docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform)(\?.*)?$/.test(formUrl);
    if (!formUrl || !isValidUrl || formUrl.includes('/edit')) {
      addLog('[ERRO] Forneça um link público válido de resposta (/viewform ou forms.gle). Links de edição não são suportados.');
      return;
    }
    
    set({ isScraping: true, formTitle: null, questions: [], logs: [], currentQuestionIndex: 0, authError: null });
    addLog(`Iniciando scrape: ${formUrl}`);
    
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formUrl })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 403) {
          addLog(`[BARREIRA] ${data.details || data.error}`);
          set({ authError: "Este formulário exige autenticação (Login) e não pode ser injetado anonimamente." });
          throw new Error('Barreira de Autenticação Detectada (403). Form protegido.');
        }
        throw new Error(data.error || 'Erro no scrape');
      }
      
      set({ formTitle: data.title, questions: data.questions, isScraping: false });
      addLog(`Formulário carregado: ${data.title} (${data.questions.length} perguntas suportadas)`);
    } catch (err: any) {
      addLog(`[ERRO] ${err.message}`);
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
          if (!get().isStealthMode) {
             get().addLog(`[200 OK] Submissão ${get().currentCount}/${current.targetCount} enviada.`);
          }
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
        const delay = Math.floor(Math.random() * (6000 - 2500 + 1) + 2500);
        if (!get().isStealthMode) {
           get().addLog(`Aguardando ${(delay / 1000).toFixed(1)}s para evasão de rate limit...`);
        }
        
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
