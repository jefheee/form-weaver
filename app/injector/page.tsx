"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useInjectorStore } from "../store/useInjectorStore";
import { Play, Square, Settings, RefreshCcw, Activity, Search, ChevronLeft, ChevronRight, Dices, TriangleAlert } from "lucide-react";

export default function FormWeaver() {
  const {
    formUrl, setFormUrl, targetCount, setTargetCount, formTitle,
    questions, currentQuestionIndex, updateOptionWeight, randomizeWeights, resetQuestionWeights,
    randomizeAll, resetAllWeights, resetApp,
    nextQuestion, prevQuestion, scrapeForm, startInjection, stopInjection, 
    isInjecting, isScraping, currentCount, logs
  } = useInjectorStore();

  const progress = targetCount > 0 ? Math.min(100, (currentCount / targetCount) * 100) : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isFinished = targetCount > 0 && currentCount === targetCount && !isInjecting && formTitle !== null;
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const scrapedUrlRef = useRef<string>("");

  // Auto-Scrape
  useEffect(() => {
    const isValidUrl = /^https:\/\/(forms\.gle\/[a-zA-Z0-9_-]+|docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform)(\?.*)?$/.test(formUrl);
    if (isValidUrl && !formUrl.includes('/edit') && formUrl !== scrapedUrlRef.current && !isScraping) {
      scrapedUrlRef.current = formUrl;
      scrapeForm();
    }
  }, [formUrl, isScraping, scrapeForm]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') prevQuestion();
      if (e.key === 'ArrowRight') nextQuestion();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevQuestion, nextQuestion]);

  // Terminal Auto-Scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Success Confetti
  useEffect(() => {
    if (isFinished) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isFinished]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0a0a0a] bg-gradient-to-br from-emerald-900/10 to-black text-neutral-200 p-6 flex flex-col gap-6 font-sans selection:bg-neutral-800">
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Activity className="text-neutral-400 w-6 h-6" />
          <h1 className="text-xl font-medium tracking-tight text-white">Form Weaver</h1>
        </div>
        <div className="text-xs text-neutral-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></span>
          System Online
        </div>
      </header>

      {/* Grid Principal */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Coluna Esquerda: Config & Execução */}
        <div className="flex flex-col gap-6 min-h-0 h-full">
          
          {/* Configuração */}
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl shrink-0 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4 text-neutral-100">
              <Settings className="w-4 h-4 text-neutral-400" />
              <h2 className="text-sm font-medium">Configuração Alvo</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs text-neutral-500 mb-1.5 block">Google Forms View URL</label>
                <div className="relative">
                  <input 
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-emerald-500/50 transition-all duration-300 ease-in-out placeholder:text-neutral-700"
                    disabled={isInjecting || isFinished}
                  />
                  {isScraping && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <RefreshCcw className="w-4 h-4 text-neutral-500 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#262626]">
                <label className="text-xs text-neutral-500 mb-2 block">Quantidade de Submissões</label>
                <div className="flex gap-4">
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {[10, 25, 50, 100].map(val => (
                      <button
                        key={val}
                        onClick={() => setTargetCount(val)}
                        disabled={isInjecting || isFinished}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                          targetCount === val 
                            ? 'bg-neutral-200 text-black' 
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                        } disabled:opacity-50`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="number"
                    value={targetCount}
                    onChange={(e) => setTargetCount(Number(e.target.value))}
                    min={1}
                    className="w-full flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50 transition-all duration-300 ease-in-out"
                    disabled={isInjecting || isFinished}
                  />
                </div>
                {targetCount > 50 && (
                  <div className="flex items-start gap-2 mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-yellow-500/80">
                    <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-tight">Aviso: Quantidades acima de 50 envios sem proxy podem sofrer shadowban do Google (parece enviado, mas não é computado).</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Ações Globais */}
          {formTitle && !isFinished && (
            <div className="flex items-center gap-3 shrink-0 animate-in fade-in duration-300">
               <button 
                  onClick={randomizeAll}
                  disabled={isInjecting}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg text-xs font-medium text-neutral-300 transition-all duration-300 ease-in-out disabled:opacity-50"
               >
                  <Dices className="w-4 h-4" />
                  Aleatório Global
               </button>
               <button 
                  onClick={resetAllWeights}
                  disabled={isInjecting}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg text-xs font-medium text-neutral-300 transition-all duration-300 ease-in-out disabled:opacity-50"
               >
                  <RefreshCcw className="w-4 h-4" />
                  Redefinir Global
               </button>
            </div>
          )}

          {/* Console de Injeção */}
          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl flex flex-col flex-1 min-h-0 relative transition-all duration-300">
            {/* Overlay de Sucesso */}
            {isFinished && (
              <div className="absolute inset-0 z-10 bg-[#0a0a0ae6] backdrop-blur-sm flex flex-col items-center justify-center rounded-xl p-6 text-center animate-in fade-in zoom-in-95 duration-500">
                <Activity className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-white mb-2">Sucesso! Injeção Concluída</h3>
                <p className="text-sm text-neutral-400 mb-6">Todas as {targetCount} submissões foram processadas e entregues.</p>
                <button 
                  onClick={() => {
                    scrapedUrlRef.current = "";
                    resetApp();
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg px-6 py-3 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  Limpar e Novo Formulário
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="text-sm font-medium text-white">Console de Injeção</h2>
              <div className="text-xs text-neutral-500">
                Status: {isInjecting ? <span className="text-emerald-400 animate-pulse">Ativo</span> : 'Ocioso'}
              </div>
            </div>

            {/* Progresso */}
            <div className="mb-4 shrink-0">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-neutral-400">Progresso</span>
                <span className="text-neutral-300">{currentCount} / {targetCount}</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-1.5 border border-white/10 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
              <button
                onClick={startInjection}
                disabled={isInjecting || questions.length === 0 || currentCount >= targetCount}
                className="bg-neutral-100 hover:bg-white text-neutral-900 rounded-lg py-2 text-sm font-medium transition-all duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Iniciar
              </button>
              <button
                onClick={stopInjection}
                disabled={!isInjecting}
                className="bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-300 rounded-lg py-2 text-sm font-medium transition-all duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4" />
                Parar
              </button>
            </div>

            {/* Terminal Log */}
            <div className="flex-1 bg-black/60 border border-white/10 rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-y-auto custom-scrollbar flex flex-col scroll-smooth">
              {logs.length === 0 ? (
                <div className="text-neutral-600">Aguardando comandos...</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className={
                      log.includes('[ERRO]') ? 'text-red-400' : 
                      log.includes('[200 OK]') ? 'text-emerald-400' : 
                      'text-neutral-400 animate-in fade-in slide-in-from-bottom-1 duration-300'
                    }>
                      {log}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Coluna Direita: Visualização de Perguntas */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex flex-col overflow-hidden h-full transition-all duration-300">
          {questions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 p-6 text-center">
              <Search className="w-8 h-8 mb-4 opacity-20 animate-pulse" />
              <p className="text-sm">Aguardando carregamento do formulário...</p>
            </div>
          ) : currentQuestion && (
            <div className="flex flex-col h-full animate-in fade-in duration-500">
              {/* Header da Pergunta */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/20 shrink-0">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-neutral-300 w-32 text-center">
                    Pergunta {currentQuestionIndex + 1} de {questions.length}
                  </span>
                  <button 
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => randomizeWeights(currentQuestion.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs font-medium text-neutral-300 transition-all duration-300 ease-in-out disabled:opacity-50"
                    disabled={isInjecting || isFinished}
                  >
                    <Dices className="w-4 h-4" />
                    Aleatório
                  </button>
                  <button 
                    onClick={() => resetQuestionWeights(currentQuestion.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs font-medium text-neutral-300 transition-all duration-300 ease-in-out disabled:opacity-50"
                    disabled={isInjecting || isFinished}
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Redefinir
                  </button>
                </div>
              </div>

              {/* Corpo da Pergunta */}
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
                <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
                  {currentQuestion.title}
                </h2>
                
                <div className="space-y-6 flex-1">
                  {currentQuestion.options.map((opt) => (
                    <div key={opt.value} className="bg-black/40 p-4 rounded-xl border border-white/10 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-neutral-300 truncate w-[80%] transition-all duration-300" title={opt.value}>
                          {opt.value}
                        </span>
                        <span className="text-sm font-bold text-neutral-100 bg-white/5 border border-white/10 px-2 py-1 rounded-md transition-all duration-300 w-12 text-center group-hover:text-emerald-400 group-hover:border-emerald-500/30">
                          {opt.weight}%
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={opt.weight}
                        onChange={(e) => updateOptionWeight(currentQuestion.id, opt.value, Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                        disabled={isInjecting || isFinished}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #404040; }
        
        /* Smooth thumb dragging */
        input[type=range]::-webkit-slider-thumb {
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
      `}} />
    </main>
  );
}
