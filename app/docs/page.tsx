import Link from 'next/link';
import { Activity, LayoutDashboard, FileText, Server, AlertTriangle, ShieldX } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Menu */}
      <aside className="w-full md:w-64 border-r border-[#1e293b] bg-[#020617] flex flex-col sticky top-0 h-auto md:h-screen shrink-0">
        <div className="p-6 border-b border-[#1e293b]">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group">
            <Activity className="text-cyan-500 w-6 h-6" />
            <h1 className="text-lg font-bold text-white transition-colors">Form Weaver</h1>
          </Link>
        </div>
        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto custom-scrollbar">
          <a href="#arquitetura" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Server className="w-4 h-4" /> Arquitetura
          </a>
          <a href="#shadowban" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <AlertTriangle className="w-4 h-4" /> Shadowban & Jitter
          </a>
          <a href="#barreiras" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <ShieldX className="w-4 h-4" /> Barreiras & Login
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen custom-scrollbar relative bg-gradient-to-br from-[#020617] to-[#0f172a]">
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
          
          <header>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Documentação Técnica</h1>
            <p className="text-slate-400 text-lg leading-relaxed">Referência técnica oficial do núcleo Form Weaver para testes de estresse em infraestruturas do Google.</p>
          </header>

          <section id="arquitetura" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Server className="text-cyan-500" />
              Arquitetura e Bypass de CORS
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 md:p-8 rounded-3xl text-slate-300 leading-relaxed space-y-4 shadow-xl">
              <p>O Google Forms protege seus endpoints contra injeções vindas diretamente do navegador via <strong>CORS (Cross-Origin Resource Sharing)</strong>. Uma requisição <code>fetch</code> direta do Frontend do Next.js seria bloqueada instantaneamente pela política de mesma origem.</p>
              <p>Para contornar essa barreira de segurança, o Form Weaver utiliza o sistema de <strong>Route Handlers do Next.js</strong> (<code>app/api/scrape</code> e <code>app/api/submit</code>) operando como um proxy Server-Side. O fluxo exato ocorre da seguinte forma:</p>
              <ol className="list-decimal list-inside pl-2 space-y-3 text-sm text-slate-400 mt-4">
                <li><strong className="text-cyan-400">Captura de Parâmetros:</strong> O Frontend coleta os pesos matemáticos inseridos e estrutura o payload de respostas probabilísticas baseadas no "Maior Resto".</li>
                <li><strong className="text-cyan-400">Relay Local:</strong> O payload é transmitido para o próprio Backend do Next.js (rodando no ambiente nativo Node.js).</li>
                <li><strong className="text-cyan-400">Disparo Neutro:</strong> O servidor Node.js cria e envia a requisição real de submissão (POST) para os endpoints hiper-escaláveis do Google.</li>
                <li><strong className="text-cyan-400">Validação Tácita:</strong> Como o Google <em>não</em> aplica verificação CORS em chamadas Server-to-Server, o payload é aceito com sucesso se estiver corretamente encodado como <code>application/x-www-form-urlencoded</code>.</li>
              </ol>
            </div>
          </section>

          <section id="shadowban" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" />
              Detecção de Shadowban e Jittering Temporal
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 md:p-8 rounded-3xl text-slate-300 leading-relaxed space-y-4 shadow-xl">
              <p>Sistemas corporativos robustos como o Google Workspace utilizam análises heurísticas baseadas em IA para proteger a integridade dos dados estatísticos coletados nas pesquisas.</p>
              <p>Se dezenas de respostas (tradicionalmente o limite de detecção primária flutua em torno de ~50 disparos) forem identificadas chegando do mesmo endereço IP isolado, dentro de um delta temporal contínuo e rápido, o Google aciona uma contenção conhecida como <strong>Shadowban</strong>. Neste estado ilusório, o servidor da Google continuará devolvendo o código HTTP 200 OK para as requisições (mascarando a defesa), porém as respostas de fato <strong>não aparecerão no banco de dados e na planilha original do criador do formulário</strong>.</p>
              
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-[#1e293b] mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">A Solução: Evasão via Jitter (Ruído Temporal)</h3>
                <p className="text-sm text-slate-400">Para evadir essa detecção de perfis estritamente robóticos, o motor de injeção injeta um atraso temporal matematicamente aleatório e ruidoso (<em>Jittering</em>) no hiato estrutural entre cada requisição sequencial. Esses atrasos normalmente flutuam de maneira assimétrica entre 2.500ms e 6.000ms. O somatório tático dessa cadência imprevisível, alinhada com a rotação orgânica dos headers de <code>User-Agent</code>, simula padrões verossímeis de latência humana. <br/><br/><em>Aviso de Arquitetura: Para cenários de larga escala (centenas/milhares de submissões instantâneas), é inviável operar a evasão apenas com Jittering; exige-se a integração de infraestrutura de Proxy Rotativo nativo para capilarizar o fluxo de IPs.</em></p>
              </div>
            </div>
          </section>

          <section id="barreiras" className="scroll-mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldX className="text-red-500" />
              Barreiras de Autenticação Ativas
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] overflow-hidden rounded-3xl shadow-xl">
              <div className="p-6 md:p-8 text-slate-300 leading-relaxed space-y-4">
                <p>O framework de injeção depende primariamente de um alicerce: que o formulário alvo seja inteiramente **anônimo** e **público**. Se o organizador do formulário marcar instâncias de retenção de dados confidenciais (por exemplo, forçar retenção de IP, limitar a quantidade de disparos ou exigir e-mails), a requisição é interceptada no gate do Google Workspace.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-[#020617]/80 border-y border-[#1e293b] text-slate-200">
                    <tr>
                      <th className="p-4 md:px-8 font-semibold">Flag de Configuração (Google Forms)</th>
                      <th className="p-4 md:px-8 font-semibold">Impacto Operacional no Form Weaver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 md:px-8 text-slate-300">Nenhuma Restrição (Configuração Padrão Base)</td>
                      <td className="p-4 md:px-8 text-cyan-400 font-medium">Totalmente Suportado (Status 200 OK Nativo)</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 md:px-8 text-slate-300">"Limitar a 1 Resposta por usuário"</td>
                      <td className="p-4 md:px-8 text-red-400 font-medium">Bloqueio Crítico (Redirecionamento OAuth 302 / Handshake 403)</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 md:px-8 text-slate-300">"Coletar endereços de E-mail (Verificado na Conta)"</td>
                      <td className="p-4 md:px-8 text-red-400 font-medium">Bloqueio Crítico (Redirecionamento OAuth 302 / Handshake 403)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-400 text-xs md:text-sm text-center font-medium">
                Nota de Engine: O Form Weaver intercepta automaticamente essa barreira, abortando o script seguro na detecção em tempo real das tags de infraestrutura <code>&lt;title&gt;Google Accounts&lt;/title&gt;</code> ou URIs contendo <code>ServiceLogin</code> e acionando o estado global de erro 403 no Zustand.
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
