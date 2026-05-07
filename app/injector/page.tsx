"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useInjectorStore } from "@/store/useInjectorStore";
import { Play, Square, Settings, RefreshCcw, Activity, Search, ChevronLeft, ChevronRight, Dices, TriangleAlert, Clock, Download, EyeOff, Eye, Keyboard, MoreVertical } from "lucide-react";

export default function FormWeaver() {
  const {
    formUrl, setFormUrl, targetCount, setTargetCount, formTitle,
    questions, currentQuestionIndex, updateOptionWeight, randomizeWeights, resetQuestionWeights,
    randomizeAll, resetAllWeights, resetApp,
    nextQuestion, prevQuestion, scrapeForm, startInjection, stopInjection, 
    isInjecting, isScraping, currentCount, logs,
    isStealthMode, setStealthMode, exportLogs, authError, setAuthError
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
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#1e293b']
      });
    }
  }, [isFinished]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#020617] bg-gradient-to-br from-[#06b6d4]/10 to-[#020617] text-slate-200 p-2 md:p-4 lg:p-6 flex flex-col gap-3 md:gap-4 lg:gap-6 font-sans selection:bg-slate-800">
      
      {/* Auth Error Modal */}
      {authError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-red-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <TriangleAlert className="w-6 h-6" />
              <h3 className="font-bold text-lg">Acesso Negado (403)</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">{authError}</p>
            <button 
              onClick={() => setAuthError(null)} 
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm"
            >
              Fechar Aviso
            </button>
          </div>
        </div>
      )}

      {/* Header Utilities */}
      <header className="flex items-center justify-between border-b border-[#1e293b] pb-2 lg:pb-4 shrink-0 transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
          <Activity className="text-cyan-500 w-5 h-5 lg:w-6 lg:h-6" />
          <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white transition-colors">Form Weaver</h1>
        </Link>
        
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="flex items-center gap-3 lg:gap-5 text-slate-400">
            <div className="flex items-center gap-1.5 text-xs group cursor-help" title="Estimativa Média (4.25s / req)">
              <Clock className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden md:inline font-mono">{((targetCount - currentCount) * 4.25).toFixed(0)}s</span>
            </div>
            
            <button onClick={exportLogs} className="flex items-center gap-1.5 text-xs hover:text-cyan-400 transition-colors" title="Exportar Terminal Log (.txt)">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Log</span>
            </button>

            <button onClick={() => setStealthMode(!isStealthMode)} className="flex items-center gap-1.5 text-xs hover:text-cyan-400 transition-colors" title="Modo Stealth (Ocultar Logs Verbosos)">
              {isStealthMode ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
              <span className={`hidden md:inline ${isStealthMode ? "text-cyan-400" : ""}`}>Stealth</span>
            </button>
          </div>
          
          <div className="hidden lg:flex items-center border-l border-[#1e293b] ml-2 pl-4">
            <a href="https://github.com/jefheee" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors">
              by jefheee
            </a>
          </div>

          <div className="text-[10px] lg:text-xs text-slate-500 flex items-center gap-1 lg:gap-2 ml-2 pl-2 lg:pl-4 border-l border-[#1e293b]">
            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-cyan-500/50 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            <span className="hidden md:inline">Online</span>
          </div>
        </div>
      </header>

      {/* Grid Principal - Responsive adjustments */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 min-h-0 custom-scrollbar">
        
        {/* Coluna Esquerda: Config & Execução */}
        <div className="flex flex-col gap-3 lg:gap-6 min-h-0 lg:h-full shrink-0">
          
          {/* Configuração */}
          <section className="bg-[#0f172a]/50 backdrop-blur-xl border border-[#1e293b] rounded-xl p-3 lg:p-5 shadow-2xl shrink-0 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 lg:mb-4 text-slate-100">
              <Settings className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400" />
              <h2 className="text-xs lg:text-sm font-bold">Configuração Alvo</h2>
            </div>
            
            <div className="space-y-3 lg:space-y-5">
              <div>
                <label className="text-[10px] lg:text-xs text-slate-500 mb-1 lg:mb-1.5 block">Google Forms View URL</label>
                <div className="relative">
                  <input 
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/d/e/.../viewform"
                    className="w-full bg-[#020617]/50 border border-[#1e293b] rounded-lg pl-2 lg:pl-3 pr-8 lg:pr-10 py-1.5 lg:py-2 text-[10px] lg:text-sm focus:outline-none focus:border-cyan-500/50 transition-all duration-300 ease-in-out placeholder:text-slate-700"
                    disabled={isInjecting || isFinished}
                  />
                  {isScraping && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <RefreshCcw className="w-4 h-4 text-cyan-500 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-2 lg:pt-4 border-t border-[#1e293b]">
                <label className="text-[10px] lg:text-xs text-slate-500 mb-1 lg:mb-2 block">Quantidade de Submissões</label>
                <div className="flex gap-2 lg:gap-4 items-center">
                  <div className="flex flex-wrap gap-1 lg:gap-2 shrink-0">
                    {[10, 25, 50, 100].map(val => (
                      <button
                        key={val}
                        onClick={() => setTargetCount(val)}
                        disabled={isInjecting || isFinished}
                        className={`px-2 lg:px-3 py-1 lg:py-1.5 text-[10px] lg:text-xs font-semibold rounded-md transition-all duration-300 ease-in-out ${
                          targetCount === val 
                            ? 'bg-slate-200 text-[#020617]' 
                            : 'bg-[#1e293b] text-slate-400 hover:bg-slate-700 hover:text-white'
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
                    className="w-full flex-1 bg-[#020617]/50 border border-[#1e293b] rounded-lg px-2 lg:px-3 py-1 lg:py-2 text-[10px] lg:text-sm focus:outline-none focus:border-cyan-500/50 transition-all duration-300 ease-in-out"
                    disabled={isInjecting || isFinished}
                  />
                </div>
                {targetCount > 50 && (
                  <div className="flex items-start gap-1 lg:gap-2 mt-2 lg:mt-3 p-1.5 lg:p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-yellow-500/80">
                    <TriangleAlert className="w-3 h-3 lg:w-4 lg:h-4 shrink-0 mt-0.5" />
                    <p className="text-[8px] lg:text-[10px] leading-tight">Aviso: Acima de 50 envios sem proxy podem sofrer shadowban do Google.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Ações Globais */}
          {formTitle && !isFinished && (
            <div className="flex items-center gap-2 lg:gap-3 shrink-0 animate-in fade-in duration-300">
               <button 
                  onClick={randomizeAll}
                  disabled={isInjecting}
                  className="flex-1 flex items-center justify-center gap-1 lg:gap-2 py-1.5 lg:py-2 bg-[#0f172a]/50 border border-[#1e293b] hover:bg-slate-800 hover:border-slate-700 rounded-lg text-[10px] lg:text-xs font-semibold text-slate-300 transition-all duration-300 ease-in-out disabled:opacity-50"
               >
                  <Dices className="w-3 h-3 lg:w-4 lg:h-4" />
                  Aleatório Global
               </button>
               <button 
                  onClick={resetAllWeights}
                  disabled={isInjecting}
                  className="flex-1 flex items-center justify-center gap-1 lg:gap-2 py-1.5 lg:py-2 bg-[#0f172a]/50 border border-[#1e293b] hover:bg-slate-800 hover:border-slate-700 rounded-lg text-[10px] lg:text-xs font-semibold text-slate-300 transition-all duration-300 ease-in-out disabled:opacity-50"
               >
                  <RefreshCcw className="w-3 h-3 lg:w-4 lg:h-4" />
                  Redefinir Global
               </button>
            </div>
          )}

          {/* Console de Injeção - Ajuste para Mobile */}
          <section className="bg-[#0f172a]/50 backdrop-blur-xl border border-[#1e293b] rounded-xl p-3 lg:p-5 shadow-2xl flex flex-col lg:flex-1 h-64 lg:h-auto min-h-0 relative transition-all duration-300">
            {/* Overlay de Sucesso */}
            {isFinished && (
              <div className="absolute inset-0 z-10 bg-[#020617e6] backdrop-blur-sm flex flex-col items-center justify-center rounded-xl p-6 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4 lg:mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-bounce">
                  <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 lg:mb-3">Injeção Concluída</h3>
                <p className="text-xs lg:text-base text-slate-400 max-w-sm mb-4 lg:mb-8 leading-relaxed">
                  Teste de estresse finalizado. {targetCount} submissões foram processadas e entregues.
                </p>
                <button
                  onClick={() => {
                    scrapedUrlRef.current = "";
                    resetApp();
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl px-6 lg:px-8 py-2.5 lg:py-3 transition-colors duration-300"
                >
                  Novo Teste Estrutural
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-2 lg:mb-4 shrink-0">
              <h2 className="text-xs lg:text-sm font-bold text-white">Console de Injeção</h2>
              <div className="text-[10px] lg:text-xs text-slate-500 font-medium">
                Status: {isInjecting ? <span className="text-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-full px-2 py-0.5 border border-cyan-500/20 bg-cyan-500/10">Active Pipeline</span> : 'Ocioso'}
              </div>
            </div>

            {/* Progresso */}
            <div className="mb-3 lg:mb-4 shrink-0">
              <div className="flex justify-between text-[10px] lg:text-xs mb-1 lg:mb-2 font-medium">
                <span className="text-slate-500">Progresso de Dados</span>
                <span className="text-slate-300 font-mono">{currentCount} / {targetCount}</span>
              </div>
              <div className="w-full bg-[#020617]/50 rounded-full h-1.5 border border-[#1e293b] overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-2 lg:mb-4 shrink-0">
              <button
                onClick={startInjection}
                disabled={isInjecting || questions.length === 0 || currentCount >= targetCount}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg py-1.5 lg:py-2 text-[10px] lg:text-sm font-semibold transition-all duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center gap-1.5 lg:gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <Play className="w-3 h-3 lg:w-4 lg:h-4" />
                Iniciar POST
              </button>
              <button
                onClick={stopInjection}
                disabled={!isInjecting}
                className="bg-[#020617] hover:bg-slate-800 border border-[#1e293b] text-slate-300 rounded-lg py-1.5 lg:py-2 text-[10px] lg:text-sm font-semibold transition-all duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center gap-1.5 lg:gap-2"
              >
                <Square className="w-3 h-3 lg:w-4 lg:h-4" />
                Abortar POST
              </button>
            </div>

            {/* Terminal Log */}
            <div className="flex-1 bg-[#020617]/80 border border-[#1e293b] rounded-lg p-2 lg:p-3 font-mono text-[8px] lg:text-[10px] leading-relaxed overflow-y-auto custom-scrollbar flex flex-col scroll-smooth">
              {logs.length === 0 ? (
                <div className="text-slate-600">Aguardando payload estrutural...</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className={
                      log.includes('[ERRO]') || log.includes('[BARREIRA]') ? 'text-red-400' : 
                      log.includes('[200 OK]') ? 'text-cyan-400 font-medium' : 
                      log.includes('Iniciando') ? 'text-blue-400 font-medium' : 
                      'text-slate-400 animate-in fade-in slide-in-from-bottom-1 duration-300'
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

        {/* Coluna Direita: Visualização de Perguntas - Altura fluida no mobile */}
        <section className="bg-[#0f172a]/50 backdrop-blur-xl border border-[#1e293b] rounded-xl flex flex-col overflow-hidden h-[50vh] lg:h-full transition-all duration-300">
          {questions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-6 text-center">
              <Search className="w-6 h-6 lg:w-8 lg:h-8 mb-4 opacity-20 animate-pulse" />
              <p className="text-xs lg:text-sm font-medium">Aguardando mapeamento do DOM (Google Forms)...</p>
            </div>
          ) : currentQuestion && (
            <div className="flex flex-col h-full animate-in fade-in duration-500">
              {/* Header da Pergunta */}
              <div className="flex flex-col md:flex-row gap-2 items-center justify-between p-3 lg:p-5 border-b border-[#1e293b] bg-[#020617]/50 shrink-0">
                <div className="flex items-center gap-2 lg:gap-3">
                  <button 
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <span className="text-[10px] lg:text-sm font-semibold text-slate-300 w-24 lg:w-32 text-center">
                    Camada DOM {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <button 
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
                <div className="flex gap-1.5 lg:gap-2">
                  <button 
                    onClick={() => randomizeWeights(currentQuestion.id)}
                    className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-[#1e293b] hover:bg-slate-700 rounded-md text-[10px] lg:text-xs font-semibold text-slate-300 transition-all duration-300 ease-in-out disabled:opacity-50"
                    disabled={isInjecting || isFinished}
                  >
                    <Dices className="w-3 h-3 lg:w-4 lg:h-4" />
                    Bypass Shuffle
                  </button>
                  <button 
                    onClick={() => resetQuestionWeights(currentQuestion.id)}
                    className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-[#1e293b] hover:bg-slate-700 rounded-md text-[10px] lg:text-xs font-semibold text-slate-300 transition-all duration-300 ease-in-out disabled:opacity-50"
                    disabled={isInjecting || isFinished}
                  >
                    <RefreshCcw className="w-3 h-3 lg:w-4 lg:h-4" />
                    Normalizar
                  </button>
                </div>
              </div>

              {/* Corpo da Pergunta */}
              <div className="p-4 lg:p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
                <h2 className="text-lg lg:text-2xl font-bold text-white mb-4 lg:mb-8 leading-tight">
                  {currentQuestion.title}
                </h2>
                
                <div className="space-y-3 lg:space-y-6 flex-1">
                  {currentQuestion.options.map((opt) => (
                    <div key={opt.value} className="bg-[#020617]/50 p-3 lg:p-4 rounded-xl border border-[#1e293b] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] group">
                      <div className="flex items-center justify-between mb-2 lg:mb-3">
                        <span className="text-[10px] lg:text-sm font-medium text-slate-300 truncate w-[70%] lg:w-[80%] transition-all duration-300" title={opt.value}>
                          {opt.value}
                        </span>
                        <span className="text-[10px] lg:text-sm font-bold text-slate-100 bg-[#1e293b] border border-slate-700 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md transition-all duration-300 w-10 lg:w-12 text-center group-hover:text-cyan-400 group-hover:border-cyan-500/30">
                          {opt.weight}%
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={opt.weight}
                        onChange={(e) => updateOptionWeight(currentQuestion.id, opt.value, Number(e.target.value))}
                        className="w-full accent-cyan-500 h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer transition-all duration-300"
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        
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
