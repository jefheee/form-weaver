import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url || !url.includes('docs.google.com/forms')) {
      return NextResponse.json({ error: 'URL do Google Forms inválida' }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Google Forms guarda a estrutura num array de config dentro de uma tag script
    let scriptContent = '';
    $('script').each((_, el) => {
      const text = $(el).html();
      if (text && text.includes('var FB_PUBLIC_LOAD_DATA_ =')) {
        scriptContent = text;
      }
    });

    if (!scriptContent) {
      return NextResponse.json({ error: 'Não foi possível encontrar a estrutura do formulário' }, { status: 400 });
    }

    // Extrair o JSON utilizando Regex
    const match = scriptContent.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s) || 
                  scriptContent.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*\]);/);
                  
    if (!match) {
      return NextResponse.json({ error: 'Falha no parsing dos dados internos' }, { status: 400 });
    }

    const data = JSON.parse(match[1]);
    const formTitle = data[3] || data[1][8] || 'Formulário Desconhecido';
    const fields = data[1][1];

    const questions: any[] = [];

    fields.forEach((f: any) => {
      const questionTitle = f[1];
      const questionType = f[3]; // 2: Múltipla Escolha, 3: Dropdown, 4: Checkboxes
      
      if ([2, 3, 4].includes(questionType) && f[4] && f[4][0]) {
        const entryId = f[4][0][0];
        const optionsData = f[4][0][1];
        
        if (optionsData) {
          const options = optionsData.map((opt: any) => ({
            value: String(opt[0]),
            weight: Math.floor(100 / optionsData.length) // Distribuição igualitária inicial
          }));
          
          questions.push({
            id: `entry.${entryId}`,
            title: questionTitle,
            type: questionType,
            options
          });
        }
      }
    });

    return NextResponse.json({ title: formTitle, questions });
  } catch (error: any) {
    console.error('Scrape Error:', error.message);
    return NextResponse.json({ error: 'Erro de conexão com o formulário' }, { status: 500 });
  }
}
