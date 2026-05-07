import Link from 'next/link';
import { Activity, ShieldCheck, PieChart, Rocket, ChevronRight, Zap, Code, SearchCode, Binary, EyeOff } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative">
      
      {/* Background Aurora Dinâmico (Cyber Obsidian) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse bg-cyan-600 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-1000 bg-blue-800 pointer-events-none" />

      {/* Header Minimalista */}
      <header className="w-full p-6 flex justify-between items-center z-10 shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Activity className="w-6 h-6 text-cyan-500" />
          <span className="font-bold text-xl tracking-tight text-white">Form Weaver</span>
        </Link>
        <Link href="/docs" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
          Documentação Técnica
        </Link>
      </header>

      {/* Conteúdo Dashboard / Bento Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 z-10 min-h-0 pb-16">
        
        {/* Main Hero Card */}
        <div className="md:col-span-8 bg-[#0f172a]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-medium tracking-wide w-fit mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            v2.0 Beta - Enterprise Build
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter mb-4 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            Orquestração de Dados para Google Forms.
          </h1>
          
          <p className="text-base lg:text-lg text-slate-400 max-w-2xl font-light leading-relaxed mb-10">
            A primeira ferramenta de stress-test e injeção probabilística de respostas em massa. Valide a resiliência dos seus formulários com simulação orgânica absoluta.
          </p>

          <Link 
            href="/injector" 
            className="group/btn flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 w-fit"
          >
            Inicie o Teste de Estresse Estrutural
            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Technical Layers - Bento Grid Compacto */}
        <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 min-h-0 h-full">
          
          {/* Layer 1 */}
          <div className="flex-1 bg-[#0f172a]/50 backdrop-blur-md border border-[#1e293b] rounded-3xl p-5 md:p-6 flex flex-col justify-center hover:border-cyan-500/30 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                <SearchCode className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-200">Camada 1: Reconhecimento de DOM</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bypass de extração silenciosa que faz o parsing do Obscure JSON nativo (<code>FB_PUBLIC_LOAD_DATA_</code>) identificando as chaves exatas <code>entry.*</code> no servidor.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="flex-1 bg-[#0f172a]/50 backdrop-blur-md border border-[#1e293b] rounded-3xl p-5 md:p-6 flex flex-col justify-center hover:border-blue-500/30 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                <Binary className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-200">Camada 2: Algoritmo de Resto</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Distribuição Matemática Avançada usando o método do Maior Resto Fracionário. Assegura o balanceamento probabilístico com exatidão matemática de soma igual a 100%.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="flex-1 bg-[#0f172a]/50 backdrop-blur-md border border-[#1e293b] rounded-3xl p-5 md:p-6 flex flex-col justify-center hover:border-cyan-500/30 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                <EyeOff className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-200">Camada 3: Evasão de Heurística</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rotatividade de User-Agents combinada com Jittering Temporal orgânico (delays flutuantes), projetado para frustrar os filtros heurísticos de anti-spam e Shadowban do Google.
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 right-6 z-10">
        <p className="text-xs text-slate-500 font-medium group transition-colors flex items-center gap-1">
          Crafted by <a href="https://github.com/jefheee" target="_blank" rel="noopener noreferrer" className="text-cyan-500/70 hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">jefheee</a>
        </p>
      </footer>
    </main>
  );
}
