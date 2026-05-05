"use client";

import { useInjectorStore } from "../store/useInjectorStore";
import { Play, Square, Settings, RefreshCcw, Activity, Search } from "lucide-react";

export default function FormWeaver() {
  const {
    formUrl, setFormUrl, targetCount, setTargetCount,
    formTitle, questions, updateOptionWeight, scrapeForm,
    startInjection, stopInjection, isInjecting, isScraping,
    currentCount, logs
  } = useInjectorStore();

  const progress = targetCount > 0 ? Math.min(100, (currentCount / targetCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans p-6 selection:bg-neutral-800">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Activity className="text-neutral-400 w-6 h-6" />
            <h1 className="text-xl font-medium tracking-tight text-white">Form Weaver</h1>
          </div>
          <div className="text-xs text-neutral-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></span>
            System Online
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Coluna Esquerda: Config & Distribuição */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Painel de Configuração */}
            <section className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 text-neutral-100">
                <Settings className="w-4 h-4 text-neutral-400" />
                <h2 className="text-sm font-medium">Configuração Alvo</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-500 mb-1.5 block">Google Forms View URL</label>
                  <input 
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
                    disabled={isInjecting}
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-neutral-500 mb-1.5 block">Quantidade de Submissões</label>
                    <input 
                      type="number"
                      value={targetCount}
                      onChange={(e) => setTargetCount(Number(e.target.value))}
                      min={1}
                      className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                      disabled={isInjecting}
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={scrapeForm}
                      disabled={isScraping || isInjecting || !formUrl}
                      className="h-[38px] px-4 bg-neutral-100 hover:bg-white text-neutral-900 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isScraping ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Carregar Form
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Painel de Distribuição */}
            {formTitle && (
              <section className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-neutral-400" />
                    Distribuição de Pesos
                  </h2>
                  <p className="text-xs text-neutral-500">Alvo: {formTitle}</p>
                </div>

                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {questions.length === 0 ? (
                    <p className="text-sm text-neutral-500 text-center py-4">Nenhuma pergunta suportada (Múltipla Escolha, Dropdown) encontrada.</p>
                  ) : (
                    questions.map((q) => (
                      <div key={q.id} className="p-4 bg-[#0a0a0a] border border-[#262626] rounded-lg">
                        <h3 className="text-sm font-medium text-neutral-300 mb-4">{q.title}</h3>
                        <div className="space-y-3">
                          {q.options.map((opt) => (
                            <div key={opt.value} className="flex items-center gap-4">
                              <span className="text-xs text-neutral-400 w-1/3 truncate" title={opt.value}>
                                {opt.value}
                              </span>
                              <input 
                                type="range" 
                                min="0" max="100" 
                                value={opt.weight}
                                onChange={(e) => updateOptionWeight(q.id, opt.value, Number(e.target.value))}
                                className="flex-1 accent-neutral-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                disabled={isInjecting}
                              />
                              <span className="text-xs text-neutral-500 w-8 text-right">{opt.weight}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Coluna Direita: Execução & Logs */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-2xl flex flex-col h-full min-h-[450px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-white">Console de Injeção</h2>
                <div className="text-xs text-neutral-500">
                  Status: {isInjecting ? <span className="text-emerald-400 animate-pulse">Ativo</span> : 'Ocioso'}
                </div>
              </div>

              {/* Progresso */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-400">Progresso</span>
                  <span className="text-neutral-300">{currentCount} / {targetCount}</span>
                </div>
                <div className="w-full bg-[#0a0a0a] rounded-full h-1.5 border border-[#262626] overflow-hidden">
                  <div 
                    className="bg-neutral-100 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={startInjection}
                  disabled={isInjecting || questions.length === 0 || currentCount >= targetCount}
                  className="bg-neutral-100 hover:bg-white text-neutral-900 rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Iniciar
                </button>
                <button
                  onClick={stopInjection}
                  disabled={!isInjecting}
                  className="bg-[#0a0a0a] hover:bg-neutral-800 border border-[#262626] text-neutral-300 rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Parar
                </button>
              </div>

              {/* Terminal Log */}
              <div className="flex-1 min-h-[250px] bg-[#050505] border border-[#262626] rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-y-auto custom-scrollbar flex flex-col-reverse">
                {logs.length === 0 ? (
                  <div className="text-neutral-600 self-start">Aguardando comandos...</div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, i) => (
                      <div key={i} className={
                        log.includes('[ERRO]') ? 'text-red-400' : 
                        log.includes('[200 OK]') ? 'text-emerald-400' : 
                        'text-neutral-400'
                      }>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
          
        </div>
      </div>
      
      {/* Scrollbar CSS customizado local */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
      `}} />
    </div>
  );
}
