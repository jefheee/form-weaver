import Link from 'next/link';
import { Activity, ShieldCheck, Zap, LockKeyhole } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] bg-gradient-to-br from-emerald-900/20 to-black text-neutral-200 font-sans selection:bg-emerald-500/30 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-700/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="max-w-5xl w-full px-6 py-20 flex flex-col items-center z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="w-12 h-12 text-emerald-500 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Form Weaver
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
            Automação probabilística de alta performance. Injeção matemática, stealth e anônima.
          </p>
        </div>

        {/* How it Works / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="bg-neutral-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/50 transition-colors">
              <LockKeyhole className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">1. Link Público</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Insira o link público do formulário (viewform ou forms.gle). Sistemas de autenticação bloqueiam injeção por segurança.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="bg-neutral-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/50 transition-colors">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">2. Balanceamento Matemático</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Distribua pesos precisos para respostas aleatórias. O algoritmo garante a soma estrita de 100% sem falhas matemáticas.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="bg-neutral-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/50 transition-colors">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">3. Injeção Stealth</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Submissões graduais com bypass de CORS, User-Agent dinâmico e delays orgânicos para evasão de Rate Limit.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link href="/injector" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-emerald-500 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="relative flex items-center gap-2">
              Acessar Injetor
              <ShieldCheck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

      </main>
    </div>
  );
}
