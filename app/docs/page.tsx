import Link from 'next/link';
import { 
  Activity, Server, AlertTriangle, ShieldX, Target, Zap, 
  Rocket, Briefcase, Cpu, Database, Network, SearchCode,
  LineChart, Sparkles
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 font-sans flex flex-col md:flex-row scroll-smooth selection:bg-cyan-500/30">
      
      {/* Sidebar Menu */}
      <aside className="w-full md:w-72 border-r border-[#1e293b] bg-[#020617] flex flex-col sticky top-0 h-auto md:h-screen shrink-0 z-20 shadow-2xl">
        <div className="p-6 border-b border-[#1e293b]">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group">
            <Activity className="text-cyan-500 w-6 h-6" />
            <h1 className="text-xl font-bold text-white transition-colors tracking-tight">Form Weaver</h1>
          </Link>
          <div className="mt-2 text-xs font-medium text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 rounded-md px-2 py-1 inline-block">
            Docs v2.0 Enterprise
          </div>
        </div>
        
        <nav className="p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto custom-scrollbar">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4 hidden md:block px-3">Conceitos Fundamentais</div>
          <a href="#visao-geral" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Target className="w-4 h-4" /> Visão Geral
          </a>
          <a href="#poder" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Zap className="w-4 h-4" /> O Poder do Motor
          </a>
          <a href="#nichos" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Briefcase className="w-4 h-4" /> Nichos e Aplicações
          </a>

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 hidden md:block px-3">Core & Engenharia</div>
          <a href="#como-funciona" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Cpu className="w-4 h-4" /> Pipeline de Injeção
          </a>
          <a href="#arquitetura" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <Server className="w-4 h-4" /> Arquitetura & CORS
          </a>

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 hidden md:block px-3">Segurança e Evasão</div>
          <a href="#shadowban" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <AlertTriangle className="w-4 h-4" /> Shadowban & Jitter
          </a>
          <a href="#barreiras" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
            <ShieldX className="w-4 h-4" /> Barreiras & Logins
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto h-screen custom-scrollbar relative bg-[#020617] scroll-smooth">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#06b6d4]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-24 pb-32 relative z-10">
          
          <header className="border-b border-[#1e293b] pb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
              Documentação Oficial
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl font-light">
              O manual definitivo para testes de estresse, simulação probabilística e engenharia reversa de submissões em infraestruturas do Google Forms.
            </p>
          </header>

          {/* 1. Visão Geral */}
          <section id="visao-geral" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Target className="text-cyan-400 w-6 h-6" />
              </div>
              Visão Geral
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-8 rounded-3xl text-slate-300 leading-relaxed space-y-6 shadow-xl">
              <p className="text-lg">
                O <strong>Form Weaver</strong> não é um simples bot de spam; é um <em>Orquestrador de Dados Estatísticos</em> de nível Enterprise. Ele foi concebido para simular o comportamento humano em larga escala ao responder questionários estruturados.
              </p>
              <p>
                Enquanto ferramentas convencionais enviam "lixo" ou dados completamente aleatórios, o Form Weaver mapeia o <strong>DOM (Document Object Model)</strong> do Google Forms para injetar respostas que obedecem a uma distribuição estatística configurada por você. Isso cria bases de dados verossímeis, orgânicas e clinicamente prontas para testes rigorosos de infraestrutura, análise de CRMs ou validação de painéis de BI.
              </p>
            </div>
          </section>

          {/* 2. O Poder da Ferramenta */}
          <section id="poder" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Zap className="text-blue-400 w-6 h-6" />
              </div>
              O Poder do Form Weaver
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 rounded-2xl hover:border-cyan-500/30 transition-colors group">
                <LineChart className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">Orquestração Probabilística</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Controle absoluto sobre a distribuição de respostas. Se você quer que 70% dos usuários escolham a opção "A", 20% a opção "B" e 10% a opção "C", o algoritmo de <em>Maior Resto Fracionário</em> garante que, ao final de 1.000 envios, a matemática seja cirurgicamente exata e orgânica.
                </p>
              </div>
              <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 rounded-2xl hover:border-blue-500/30 transition-colors group">
                <Sparkles className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">Síntese de Personas (Massa Sintética)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A capacidade de criar bases de dados massivas e estatisticamente perfeitas sem precisar de um único ser humano. Isso elimina as dezenas de horas perdidas gerando planilhas de demonstração à mão.
                </p>
              </div>
              <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 rounded-2xl md:col-span-2 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Cpu className="w-16 h-16 text-indigo-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Scraping Assíncrono Sem Headless Browser</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Ferramentas como Selenium ou Puppeteer são pesadas, lentas e fáceis de detectar. O Form Weaver extrai a espinha dorsal JSON do formulário (<em>FB_PUBLIC_LOAD_DATA_</em>) via HTTP limpo, montando a estrutura localmente na memória. Isso permite execuções instantâneas, sem atrasos de renderização de tela.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Nichos e Aplicações */}
          <section id="nichos" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Briefcase className="text-emerald-400 w-6 h-6" />
              </div>
              Nichos e Beneficiários
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] rounded-3xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1e293b]">
                
                <div className="p-8">
                  <Database className="w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">QA & Engenheiros de Dados</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Ao conectar um Google Forms a um banco de dados, Zapier, Make, ou Webhooks complexos, engenheiros precisam testar o limite de <em>Rate Limit</em> (carga) das suas automações antes de abrir o link para milhares de pessoas.
                  </p>
                  <ul className="space-y-2 text-sm text-emerald-400 font-medium">
                    <li>• Testes de estresse de Webhooks.</li>
                    <li>• Validação de Parsing em pipelines ETL.</li>
                  </ul>
                </div>

                <div className="p-8">
                  <LineChart className="w-8 h-8 text-cyan-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Agências de Marketing (UX/UI)</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Apresentar um Dashboard, CRM ou relatório no PowerBI/Looker Studio vazio para o cliente é péssimo. O Form Weaver injeta dados hiper-realistas para compor painéis de demonstração vibrantes e estatisticamente plausíveis.
                  </p>
                  <ul className="space-y-2 text-sm text-cyan-400 font-medium">
                    <li>• População instantânea de Dashboards.</li>
                    <li>• Demonstração comercial com "Mock Data".</li>
                  </ul>
                </div>

                <div className="p-8 border-t border-[#1e293b]">
                  <SearchCode className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Acadêmicos e Pesquisadores</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Estatísticos e acadêmicos podem validar se seus algoritmos de cálculo de <em>p-value</em>, Anovas e regressões estão funcionando perfeitamente em planilhas alimentadas automaticamente, criando dados de controle "placebo".
                  </p>
                </div>

                <div className="p-8 border-t border-[#1e293b]">
                  <ShieldX className="w-8 h-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Pen-Testers (Red Teams)</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Analistas de cibersegurança podem usar o Form Weaver para provar vulnerabilidades arquiteturais em sistemas de votação amadores, pesquisas corporativas desprotegidas ou gincanas online manipuláveis.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* 4. Como Funciona (Pipeline) */}
          <section id="como-funciona" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Cpu className="text-indigo-400 w-6 h-6" />
              </div>
              O Pipeline de Injeção
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-8 rounded-3xl relative overflow-hidden shadow-xl">
              
              <div className="absolute left-[39px] md:left-[43px] top-12 bottom-12 w-0.5 bg-[#1e293b]" />
              
              <div className="space-y-8 relative z-10">
                
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#020617] border-2 border-indigo-500 flex items-center justify-center shrink-0 font-bold text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Handshake e Obscure JSON Extraction</h3>
                    <p className="text-slate-400 leading-relaxed">
                      O backend simula uma visita ao formulário e ignora todo o HTML/CSS visual. Ele caça a tag <code>&lt;script&gt;</code> que contém o <code>FB_PUBLIC_LOAD_DATA_</code>. O Form Weaver então faz o parsing brutal desse array multi-dimensional caótico para extrair chaves internas sagradas como as IDs de entrada (<code>entry.123456789</code>) que o banco do Google exige no `POST`.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#020617] border-2 border-cyan-500 flex items-center justify-center shrink-0 font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Interface de Balanceamento</h3>
                    <p className="text-slate-400 leading-relaxed">
                      As opções caídas do formulário ganham vida em um painel Zustand ultra-responsivo. Você movimenta os sliders e o software auto-corrige matematicamente todas as outras alternativas, preservando o tecido estatístico inflexível de 100%.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#020617] border-2 border-emerald-500 flex items-center justify-center shrink-0 font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Stealth POST & Abort Controller</h3>
                    <p className="text-slate-400 leading-relaxed">
                      No momento do play, o cliente empacota as decisões baseadas nos pesos (roletas fracionárias) e entrega via `fetch` ao Next.js, que formata payloads em <code>application/x-www-form-urlencoded</code> e os arremessa anonimamente contra os endpoints do Google, blindados sob um controlador de interrupção instantânea (<code>AbortController</code>).
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 5. Arquitetura e Bypass CORS */}
          <section id="arquitetura" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-slate-500/10 rounded-xl border border-slate-500/20">
                <Server className="text-slate-400 w-6 h-6" />
              </div>
              Arquitetura e Bypass de CORS
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 md:p-8 rounded-3xl text-slate-300 leading-relaxed space-y-4 shadow-xl">
              <p>O Google Forms protege severamente seus endpoints contra injeções vindas diretamente de navegadores de terceiros via política <strong>CORS (Cross-Origin Resource Sharing)</strong>. Uma requisição <code>fetch</code> nativa pelo React seria rechaçada violentamente, resultando num block imediato na aba de Network.</p>
              <p>A genialidade do Form Weaver reside no uso de <strong>Next.js Route Handlers</strong>. Ele age como uma VPN/Proxy interna:</p>
              <ol className="list-decimal list-inside pl-2 space-y-3 text-sm text-slate-400 mt-4">
                <li><strong className="text-cyan-400">Intra-Rede:</strong> O Frontend manda o comando limpo para o próprio Backend local do Node.js (`/api/submit`).</li>
                <li><strong className="text-cyan-400">Ponte Node.js:</strong> O servidor assume a responsabilidade de disparar a requisição real contra a nuvem da Alphabet (Google).</li>
                <li><strong className="text-cyan-400">Ponto Cego:</strong> O Google <em>não impõe</em> restrições CORS em chamadas feitas de <code>Server-to-Server</code>. Portanto, para os servidores da nuvem, a nossa requisição é tão válida quanto a de um formulário oficial, garantindo o código `HTTP 200 OK`.</li>
              </ol>
            </div>
          </section>

          {/* 6. Shadowban */}
          <section id="shadowban" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <AlertTriangle className="text-yellow-500 w-6 h-6" />
              </div>
              Detecção de Shadowban e Jittering
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] p-6 md:p-8 rounded-3xl text-slate-300 leading-relaxed space-y-4 shadow-xl">
              <p>A maior defesa passiva das corporações modernas é o que chamamos de <strong>Shadowban (Banimento Fantasma)</strong>. Se o servidor for atingido de forma sobre-humana (ex: 50 envios puros caindo simultaneamente do mesmo IP num espaço de milissegundos), o Google Workspace aciona sua heurística.</p>
              <p>Para não avisar o atacante de que ele foi detectado, o Google <strong>continua devolvendo o status "HTTP 200 OK"</strong>. O Injetor acha que está vencendo, mas, do outro lado da muralha, as respostas são silenciosamente expurgadas para o vácuo, não integrando a planilha real da vítima.</p>
              
              <div className="bg-[#020617] p-6 rounded-2xl border border-[#1e293b] mt-6 shadow-inner">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Network className="w-5 h-5 text-cyan-500" />
                  Evasão Tática: Ruído Temporal (Jittering)
                </h3>
                <p className="text-sm text-slate-400">
                  A mecânica central do Form Weaver para transpassar essa muralha é o Jittering. Ao invés de usar `setInterval` cravado, o script gera "delays sujos" e dinâmicos de maneira randômica entre cada POST (oscilando tipicamente entre <strong>2.5s e 6.0s</strong>). 
                  <br/><br/>
                  Isso polui as métricas estatísticas da IA de segurança corporativa, disfarçando o tráfego mecanizado num mar de latência humana crível. Para campanhas brutais acima de centenas de respostas, recomendamos ativamente a conexão do motor a uma teia de Proxies Rotativos.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Barreiras */}
          <section id="barreiras" className="scroll-mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                <ShieldX className="text-red-500 w-6 h-6" />
              </div>
              Barreiras de Autenticação Ativas
            </h2>
            <div className="bg-[#0f172a]/50 border border-[#1e293b] overflow-hidden rounded-3xl shadow-xl">
              <div className="p-6 md:p-8 text-slate-300 leading-relaxed space-y-4 border-b border-[#1e293b]">
                <p>O coração estatístico da injeção baseia-se num pilar indispensável: o formulário alvo **deve** ser um campo limpo, público e totalmente anônimo. Qualquer configuração do organizador que retenha a sessão do lado da Google irá barrar o motor violentamente no primeiro milissegundo de handshake.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-[#020617] border-b border-[#1e293b] text-slate-200">
                    <tr>
                      <th className="p-5 md:px-8 font-bold tracking-wide">Flag Configurada no Google Forms</th>
                      <th className="p-5 md:px-8 font-bold tracking-wide">Resposta Operacional do Form Weaver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 md:px-8 text-slate-300 font-medium">Formulário Totalmente Público (Padrão)</td>
                      <td className="p-5 md:px-8 text-cyan-400 font-bold">Totalmente Suportado (Status 200 OK)</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 md:px-8 text-slate-300 font-medium">Limitar a 1 Resposta (Força Cookie/Login)</td>
                      <td className="p-5 md:px-8 text-red-400 font-bold">Bloqueio Instantâneo (Redirect 403 Detectado)</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-5 md:px-8 text-slate-300 font-medium">Coletar endereços de E-mail (Verificado)</td>
                      <td className="p-5 md:px-8 text-red-400 font-bold">Bloqueio Instantâneo (Redirect 403 Detectado)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-5 bg-red-500/10 text-red-400 text-xs md:text-sm text-center font-medium leading-relaxed">
                <AlertTriangle className="w-4 h-4 inline-block mr-1 mb-0.5" />
                No milissegundo em que o servidor Node escuta a string <code>ServiceLogin</code> num Request HTTP ou avista a tag HTML <code>&lt;title&gt;Google Accounts&lt;/title&gt;</code>, o sistema desativa as roletas, corta o fluxo de bits e arremessa o Modal 403 na UI do usuário. Precisão arquitetural cega a vazamentos.
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Global Custom Scrollbar Styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />
    </div>
  );
}
