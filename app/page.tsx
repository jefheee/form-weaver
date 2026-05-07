import Link from 'next/link';
import { ShieldCheck, PieChart, Rocket, ChevronRight, Activity, Zap, Code } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#050505] text-neutral-200 font-sans selection:bg-emerald-500/30 flex flex-col relative">
      
      {/* Background Aurora Dinâmico */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse bg-emerald-600 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-1000 bg-teal-800 pointer-events-none" />

      {/* Header Minimalista */}
      <header className="w-full p-6 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-emerald-500" />
          <span className="font-bold text-xl tracking-tight text-white">Form Weaver</span>
        </div>
        <Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors">
          Documentação
        </Link>
      </header>

      {/* Conteúdo Dashboard / Bento */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 z-10 min-h-0 pb-16">
        
        {/* Main Hero Card */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wide w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v2.0 Beta - Testes de Estresse
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold tracking-tighter mb-4 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Orquestração de Dados para Google Forms.
          </h1>
          
          <p className="text-base lg:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed mb-8">
            A primeira ferramenta de stress-test e injeção probabilística de respostas em massa. Valide a resiliência dos seus formulários com simulação orgânica absoluta.
          </p>

          <Link 
            href="/injector" 
            className="group/btn flex items-center justify-center gap-2 px-8 py-4 font-medium text-black bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] w-fit"
          >
            Acessar Centro de Comando
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Processamento - Side Cards */}
        <div className="md:col-span-4 flex flex-col gap-6 min-h-0">
          <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" /> Processamento
            </h3>
            <ul className="space-y-4 text-xs lg:text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-mono mt-0.5">01</span>
                <span>Handshake & Bypass de Obscure JSON para extração estrutural.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-mono mt-0.5">02</span>
                <span>Weighted Randomization (Algoritmo de resto p/ soma 100%).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-mono mt-0.5">03</span>
                <span>Stealth POST Simulation (Anti-CORS & Jittering).</span>
              </li>
            </ul>
          </div>
          
          <div className="hidden lg:flex h-32 bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/20 rounded-3xl p-6 items-center justify-between group">
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">Pronto para rodar?</span>
              <span className="text-neutral-400 text-sm">Nenhum setup necessário.</span>
            </div>
            <Code className="w-10 h-10 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 right-6 z-10">
        <p className="text-xs text-neutral-600 font-medium group transition-colors">
          Crafted by <a href="https://github.com/jefheee" target="_blank" rel="noopener noreferrer" className="text-emerald-500/50 hover:text-emerald-400 transition-colors hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">jefheee</a>
        </p>
      </footer>
    </main>
  );
}
