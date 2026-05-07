import Link from 'next/link';
import { Activity, LayoutDashboard, FileText, Server, AlertTriangle, ShieldX } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-neutral-200 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Menu */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col sticky top-0 h-auto md:h-screen shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer group">
            <Activity className="text-emerald-500 w-6 h-6" />
            <h1 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Form Weaver</h1>
          </Link>
        </div>
        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          <a href="#arquitetura" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium text-neutral-400 hover:text-white whitespace-nowrap">
            <Server className="w-4 h-4" /> Arquitetura
          </a>
          <a href="#shadowban" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium text-neutral-400 hover:text-white whitespace-nowrap">
            <AlertTriangle className="w-4 h-4" /> Shadowban & Jitter
          </a>
          <a href="#barreiras" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium text-neutral-400 hover:text-white whitespace-nowrap">
            <ShieldX className="w-4 h-4" /> Barreiras & Login
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen custom-scrollbar relative">
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
          
          <header>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Documentação Oficial</h1>
            <p className="text-neutral-400 text-lg leading-relaxed">Referência técnica da ferramenta de stress-test e injeção probabilística Form Weaver.</p>
          </header>

          <section id="arquitetura" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Server className="text-emerald-500" />
              Arquitetura e Bypass de CORS
            </h2>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-neutral-300 leading-relaxed space-y-4">
              <p>O Google Forms protege seus endpoints contra injeções vindas diretamente do navegador via <strong>CORS (Cross-Origin Resource Sharing)</strong>. Uma requisição <code>fetch</code> direta do Frontend do Next.js seria bloqueada instantaneamente.</p>
              <p>Para contornar essa barreira de segurança, o Form Weaver utiliza o sistema de <strong>Route Handlers do Next.js</strong> (<code>app/api/scrape</code> e <code>app/api/submit</code>). O fluxo ocorre da seguinte forma:</p>
              <ol className="list-decimal list-inside pl-2 space-y-2 text-sm text-neutral-400">
                <li>O Frontend coleta os pesos e estrutura o payload de respostas.</li>
                <li>O payload é enviado para o próprio Backend do Next.js (Node.js runtime).</li>
                <li>O servidor Node.js dispara a requisição real de submissão (POST) para os servidores do Google.</li>
                <li>Como o Google não verifica CORS em chamadas Server-to-Server, o payload é aceito com sucesso se estiver bem formatado.</li>
              </ol>
            </div>
          </section>

          <section id="shadowban" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" />
              Detecção de Shadowban e Jittering Temporal
            </h2>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-neutral-300 leading-relaxed space-y-4">
              <p>Sistemas corporativos como o Google Workspace utilizam análises heurísticas para proteger a integridade dos dados coletados.</p>
              <p>Se dezenas de respostas (acima de ~50) forem detectadas chegando do mesmo endereço IP em um curto intervalo de tempo constante, o Google aplica um <strong>Shadowban</strong>. O servidor continuará retornando HTTP 200 OK (para enganar o atacante/injetor), porém as respostas <strong>não</strong> aparecerão na planilha do criador do formulário.</p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-2">A Solução: Jitter (Ruído Temporal)</h3>
              <p className="text-sm text-neutral-400">Para evadir a detecção de padrões robóticos de bot, o injetor adiciona um atraso de tempo matematicamente aleatório (<em>Jittering</em>) entre as requisições, geralmente flutuando entre 2.5s e 6.0s. Além de rotacionar o User-Agent, a submissão lenta tenta imitar o padrão humano, garantindo a eficácia de injeções moderadas. (Para centenas de respostas, é necessário um Proxy Rotativo).</p>
            </div>
          </section>

          <section id="barreiras" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldX className="text-red-500" />
              Barreiras de Autenticação
            </h2>
            <div className="bg-white/5 border border-white/10 overflow-hidden rounded-2xl">
              <div className="p-6 text-neutral-300 leading-relaxed space-y-4">
                <p>A injeção depende que o formulário seja inteiramente anônimo e público. Se o criador do formulário marcar certas configurações restritivas, a automação será barrada pelo processo de OAuth do Google antes mesmo da renderização do formulário.</p>
              </div>
              <table className="w-full text-left text-sm text-neutral-400">
                <thead className="bg-black/40 border-y border-white/10 text-neutral-200">
                  <tr>
                    <th className="p-4 font-semibold">Configuração do Criador</th>
                    <th className="p-4 font-semibold">Impacto no Form Weaver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5">
                    <td className="p-4">Nenhuma Restrição (Padrão)</td>
                    <td className="p-4 text-emerald-400">Totalmente Suportado (Status 200 OK)</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4">Limitar a 1 Resposta</td>
                    <td className="p-4 text-red-400">Bloqueado (Redireciona p/ Login / Status 403)</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-4">Coletar endereços de E-mail (Verificado)</td>
                    <td className="p-4 text-red-400">Bloqueado (Redireciona p/ Login / Status 403)</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-400 text-xs text-center">
                Nota: O Store bloqueia automaticamente o início da injeção se detectar a flag HTML <code>&lt;title&gt;Google Accounts&lt;/title&gt;</code> ou <code>ServiceLogin</code> na URL de destino.
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
