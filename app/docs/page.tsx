import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-neutral-200 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors w-fit group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </Link>

        <header className="border-b border-white/10 pb-6 mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Documentação Oficial</h1>
          <p className="text-neutral-400 text-lg">Form Weaver - Ferramenta de Injeção Probabilística</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">O que é</h2>
          <p className="text-neutral-400 leading-relaxed">
            O <strong>Form Weaver</strong> é uma ferramenta de stress-test e modelagem probabilística projetada para pesquisadores acadêmicos, de mercado e engenheiros de dados. Ela permite validar a resiliência estrutural e a captação de dados de formulários Google por meio da injeção autônoma de respostas baseadas em pesos (probabilidades matemáticas).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Como Funciona</h2>
          <ol className="list-decimal list-inside space-y-3 text-neutral-400 leading-relaxed ml-2">
            <li>
              <strong className="text-emerald-400">Raspagem da Estrutura:</strong> A ferramenta realiza o bypass de extração no endpoint público do Google Forms, inferindo o JSON de dados globais (<code>FB_PUBLIC_LOAD_DATA_</code>) para mapear os campos, IDs internos e alternativas suportadas.
            </li>
            <li>
              <strong className="text-emerald-400">Distribuição Matemática:</strong> Através de um algoritmo avançado de Resto Fracionário, os pesos probabilísticos definidos pelo usuário (ex: 70% na opção A, 30% na opção B) são estritamente respeitados. A soma é sempre calculada em inteiros exatos garantindo 100% de coerência.
            </li>
            <li>
              <strong className="text-emerald-400">Injeção Stealth:</strong> Utilizando chamadas HTTP forjadas, a aplicação contorna as limitações de CORS e executa delays randômicos orgânicos (jittering temporal) e injeção de User-Agent genérico para simular respostas humanas.
            </li>
          </ol>
        </section>

        <section className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white">Limitações e Bloqueios</h2>
          
          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium text-emerald-500">1. O Google Shadowban</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Requisições massivas originadas de um mesmo endereço IP acionam os algoritmos de detecção de spam do Google. Ao atingir o limite prático de aproximadamente <strong>50 requisições simultâneas sem rotação de Proxy</strong>, o Google pode implementar um <em>Shadowban</em> (Banimento Silencioso). A requisição continuará retornando status 200 OK, porém o preenchimento não será contabilizado na planilha.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-medium text-emerald-500">2. Bloqueios de Autenticação</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              O modelo de injeção funciona estritamente de maneira anônima. Caso o formulário possua barreiras de restrição ativadas nativamente (como <strong>Limitar a 1 resposta</strong> ou <strong>Coletar endereços de e-mail verificados</strong>), o payload do Google automaticamente forçará um redirecionamento 302 para a rota de <code>ServiceLogin</code> (Autenticação Google). Neste cenário, a injeção será <strong>imediatamente bloqueada e rejeitada (Status 403)</strong> para proteger as credenciais.
            </p>
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-neutral-600">
          Form Weaver &copy; 2026. Somente para fins de validação estrutural.
        </footer>

      </div>
    </div>
  );
}
