# **🕸️ Form Weaver | Orquestração Probabilística e Stress-Test para Google Forms**

O **Form Weaver** não é um simples bot de automação; é um **Orquestrador de Dados Estatísticos** de nível Enterprise. Construído sob uma arquitetura de proxy server-side, ele foi concebido para simular o comportamento humano em larga escala, injetando respostas orgânicas e clinicamente prontas para testes rigorosos de infraestrutura e análise de dados.

Desenvolvido com foco absoluto em evasão de heurística (anti-shadowban), precisão matemática e performance de execução assíncrona, eliminando a necessidade de navegadores headless pesados.

---

## **🚀 O Problema e a Solução**

Ferramentas convencionais de automação falham de duas maneiras críticas: ou injetam dados completamente caóticos que inutilizam a base estatística, ou são instantaneamente barradas pelas políticas de CORS e Rate Limit do Google. Além disso, depender de bibliotecas como Puppeteer ou Selenium torna a execução lenta e facilmente detectável.

**A Solução Form Weaver:** O motor faz o scraping assíncrono e cirúrgico da espinha dorsal JSON (`FB_PUBLIC_LOAD_DATA_`) do formulário via HTTP limpo. Na interface, um algoritmo de **Maior Resto Fracionário** permite que o usuário molde a probabilidade exata de cada resposta (ex: 70% A, 20% B, 10% C), mantendo o tecido estatístico estrito de 100%. A injeção ocorre em *Stealth Mode* utilizando as API Routes do Next.js como ponte Server-to-Server, destruindo bloqueios de CORS.

---

## **🎯 Nichos e Casos de Uso Estratégicos**

* **QA & Engenheiros de Dados:** Testes de estresse absolutos para pipelines ETL, Webhooks, integrações com Zapier/Make e bancos de dados acoplados a formulários, avaliando a resiliência sob carga extrema antes do lançamento ao público.
* **Agências de Marketing (UX/UI):** População instantânea de CRMs, Dashboards (PowerBI, Looker Studio) com dados hiper-realistas e estatisticamente plausíveis para demonstrações comerciais (Mock Data orgânico).
* **Acadêmicos e Pesquisadores:** Criação massiva de dados de controle ("placebo") para validação de algoritmos de cálculo de *p-value*, Anovas e modelos de regressão linear.
* **Pen-Testers (Red Teams):** Comprovação de vulnerabilidades arquiteturais em pesquisas corporativas desprotegidas, sistemas de votação amadores e ausência de sanitização de inputs.

---

## **⚙️ Arquitetura e Pipeline de Injeção**

### **1. Handshake e Obscure JSON Extraction**
O backend simula uma visita inicial e ignora a árvore de renderização (HTML/CSS). Ele intercepta diretamente a tag `<script>` interna e faz o parsing brutal do array multi-dimensional do Google, extraindo com precisão as chaves sagradas de input (`entry.123456789`) necessárias para o payload final.

### **2. Dashboard de Balanceamento**
O front-end transforma as chaves raspadas em um painel Zustand reativo. Ao mover os sliders de probabilidade, o motor auto-corrige instantaneamente todas as outras opções da pergunta, preservando a matemática exata para a criação das *Personas Sintéticas*.

### **3. Stealth POST & Evasão Server-to-Server**
O Google Forms bloqueia severamente injeções Client-Side (Browser) via CORS. O Form Weaver resolve isso roteando a requisição pelo próprio backend em Node.js (`/api/submit`). Para o Google, o *POST* com formato `application/x-www-form-urlencoded` provém de um servidor autêntico da nuvem, garantindo o status `HTTP 200 OK`. Tudo protegido por um `AbortController` para interrupção instantânea.

---

## **🛡️ Defesas Avançadas: Jittering e Auth Barricades**

* **Ruído Temporal (Jittering anti-Shadowban):** O Google usa heurística para aplicar *Shadowban* (banimento fantasma, retornando 200 OK mas expurgando a resposta da planilha) em requisições mecanizadas simultâneas. O Form Weaver utiliza *Jittering*, aplicando delays randômicos "sujos" (ex: oscilando entre 2.5s e 6.0s) para poluir as métricas do Workspace e simular latência humana.
* **Detecção de Barreiras Ativas (403):** O motor exige formulários limpos e públicos. Se o organizador ativar *Limitar a 1 Resposta* ou *Coletar E-mails* (forçando cookies de login), o backend detecta imediatamente a string `ServiceLogin` ou a tag `<title>Google Accounts</title>`, aborta o handshake no primeiro milissegundo e arremessa um Modal 403 de proteção na UI.

---

## **🛠️ Stack Tecnológico**

* **Framework:** Next.js 14/15 (App Router).
* **Styling & UI:** Tailwind CSS (Estética Cyber Obsidian minimalista, layout No-Scroll full viewport) e Lucide Icons.
* **State Management:** Zustand (Controle de loops assíncronos de injeção, auto-scroll do terminal e balanceamento de sliders).
* **Scraping Engine:** Cheerio (Extração via Node.js em ambiente isolado).
* **Networking:** API Routes nativas como Proxy de Evasão CORS.

---

## **💻 Como Rodar Localmente**

1. **Clone este repositório:** `git clone https://github.com/jefheee/form-weaver.git`

2. **Acesse o diretório:** `cd form-weaver`

3. **Instale as dependências:** `npm install`

4. **Inicie o Servidor de Comando Central:** `npm run dev`

   *O Dashboard de Injeção estará operante em `http://localhost:3000`.*
