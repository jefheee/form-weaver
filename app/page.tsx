// app/page.tsx
"use client";

import { useInjectorStore } from "../store/useInjectorStore";
import { Play, Square, Settings, RefreshCcw, Activity, Search, ChevronLeft, ChevronRight, Dices } from "lucide-react";

export default function FormWeaver() {
  const {
    formUrl, setFormUrl, targetCount, setTargetCount,
    questions, currentQuestionIndex, updateOptionWeight, randomizeWeights,
    nextQuestion, prevQuestion, scrapeForm, startInjection, stopInjection,
    isInjecting, isScraping, currentCount, logs
  } = useInjectorStore();

  const progress = targetCount > 0 ? Math.min(100, (currentCount / targetCount) * 100) : 0;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0a0a0a] text-neutral-200 p-6 flex flex-col gap-6 font-sans selection:bg-neutral-800">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-800 pb-4 shrink-0">
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
          <section className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-2xl shrink-0">
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
                  <label className="text-xs text-neutral-500 mb-1.5 block">Submissões</label>
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

          {/* Console de Injeção */}
          <section className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-2xl flex flex-col flex-1 min-h-0">
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
              <div className="w-full bg-[#0a0a0a] rounded-full h-1.5 border border-[#262626] overflow-hidden">
                <div
                  className="bg-neutral-100 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
              <button
                onClick={startInjection}
                disabled={isInjecting || questions.length === 0 || currentCount >= targetCount}
                className="bg-neutral-100 hover:bg-white text-neutral-900 rounded-lg py-2 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Iniciar
              </button>
              <button
                onClick={stopInjection}
                disabled={!isInjecting}
                className="bg-[#0a0a0a] hover:bg-neutral-800 border border-[#262626] text-neutral-300 rounded-lg py-2 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4" />
                Parar
              </button>
            </div>

            {/* Terminal Log */}
            <div className="flex-1 bg-[#050505] border border-[#262626] rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-y-auto custom-scrollbar flex flex-col-reverse">
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

        {/* Coluna Direita: Visualização de Perguntas */}
        <section className="bg-[#121212] border border-[#262626] rounded-xl flex flex-col overflow-hidden h-full">
          {questions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 p-6 text-center">
              <Search className="w-8 h-8 mb-4 opacity-20" />
              <p className="text-sm">Aguardando carregamento do formulário...</p>
            </div>
          ) : currentQuestion && (
            <div className="flex flex-col h-full">
              {/* Header da Pergunta */}
              <div className="flex items-center justify-between p-5 border-b border-[#262626] bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-neutral-300">
                    Pergunta {currentQuestionIndex + 1} de {questions.length}
                  </span>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => randomizeWeights(currentQuestion.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-xs font-medium text-neutral-300 transition-colors disabled:opacity-50"
                  disabled={isInjecting}
                >
                  <Dices className="w-4 h-4" />
                  Aleatório
                </button>
              </div>

              {/* Corpo da Pergunta */}
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
                  {currentQuestion.title}
                </h2>

                <div className="space-y-6 flex-1">
                  {currentQuestion.options.map((opt) => (
                    <div key={opt.value} className="bg-[#0a0a0a] p-4 rounded-xl border border-[#262626]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-neutral-300 truncate w-[80%]" title={opt.value}>
                          {opt.value}
                        </span>
                        <span className="text-sm font-bold text-neutral-100 bg-neutral-800 px-2 py-1 rounded-md">
                          {opt.weight}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0" max="100"
                        value={opt.weight}
                        onChange={(e) => updateOptionWeight(currentQuestion.id, opt.value, Number(e.target.value))}
                        className="w-full accent-neutral-500 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                        disabled={isInjecting}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #404040; }
      `}} />
    </main>
  );
}
