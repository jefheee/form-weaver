import Link from 'next/link';
import { ShieldCheck, PieChart, Rocket, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden flex flex-col justify-center items-center bg-[#050505] text-neutral-200 font-sans selection:bg-emerald-500/30">
      
      {/* Background Animado Dinâmico */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse bg-emerald-600 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse delay-1000 bg-teal-800 pointer-events-none" />

      <main className="max-w-6xl w-full px-6 py-24 flex flex-col items-center mx-auto z-10 flex-1">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-12">
          
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v2.0 Beta - Testes de Estresse
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
              Orquestração de Dados para Google Forms.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl font-light leading-relaxed mb-10">
            A primeira ferramenta de stress-test e injeção probabilística de respostas em massa para pesquisas. Valide a resiliência dos seus formulários com simulação orgânica.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/injector" 
              className="group flex items-center justify-center gap-2 px-8 py-3.5 font-medium text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Acessar Injetor
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/docs" 
              className="group flex items-center justify-center gap-2 px-8 py-3.5 font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              Ver Documentação
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          
          {/* Card 1 */}
          <div className="bg-[#111111]/50 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-500 group flex flex-col">
            <div className="bg-neutral-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 transition-colors">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Bypass de Restrições</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Simulação de User-Agents dinâmicos e CORS bypass.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-[#111111]/50 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-500 group flex flex-col">
            <div className="bg-neutral-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 transition-colors">
              <PieChart className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Distribuição Perfeita</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Algoritmo de maior resto para balancear pesos com 100% de exatidão matemática.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111111]/50 backdrop-blur-md border border-neutral-800 p-8 rounded-2xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-500 group flex flex-col">
            <div className="bg-neutral-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 transition-colors">
              <Rocket className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Injeção Orgânica</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Jittering de tempo e evasão de rate-limit (shadowban) na nuvem.
            </p>
          </div>

        </div>

      </main>

      <footer className="w-full py-8 text-center border-t border-neutral-900 z-10">
        <p className="text-xs text-neutral-600 font-medium">
          Form Weaver &copy; 2026. Desenvolvido para fins de validação estrutural.
        </p>
      </footer>
    </main>
  );
}
