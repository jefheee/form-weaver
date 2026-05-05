// app/api/scrape/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const isValidUrl = /^https:\/\/(forms\.gle\/[a-zA-Z0-9_-]+|docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/viewform)(\?.*)?$/.test(url);

    if (!url || !isValidUrl) {
      return NextResponse.json({ error: 'Erro: Forneça um link público válido de resposta (/viewform ou forms.gle). Links de edição não são suportados.' }, { status: 400 });
    }

    if (url.includes('/edit')) {
      return NextResponse.json({ error: 'Erro: Forneça um link público válido de resposta (/viewform ou forms.gle). Links de edição não são suportados.' }, { status: 400 });
    }

    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const finalUrl = res.url;
    const html = await res.text();

    if (finalUrl.includes('ServiceLogin') || finalUrl.includes('accounts.google.com') || html.includes('<title>Google Accounts</title>') || html.includes('accounts.google.com/ServiceLogin')) {
      return NextResponse.json({ error: "Formulário protegido: O criador ativou 'Limitar a 1 resposta' ou 'Coletar e-mails'. O Google exige login, bloqueando injeções anônimas." }, { status: 403 });
    }
    
    const $ = cheerio.load(html);

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

    const match = scriptContent.match(/var\s+FB_PUBLIC_LOAD_DATA_\s*=\s*(\[[\s\S]*?\]);/);

    if (!match) {
      return NextResponse.json({ error: 'Falha no parsing dos dados internos' }, { status: 400 });
    }

    const data = JSON.parse(match[1]);
    const formTitle = data[3] || data[1][8] || 'Formulário Desconhecido';
    const fields = data[1][1];

    const questions: any[] = [];

    fields.forEach((f: any) => {
      const questionTitle = f[1];
      const questionType = f[3];

      if ([2, 3, 4].includes(questionType) && f[4] && f[4][0]) {
        const entryId = f[4][0][0];
        const optionsData = f[4][0][1];

        if (optionsData) {
          const options = optionsData.map((opt: any) => ({
            value: String(opt[0]),
            weight: Math.floor(100 / optionsData.length)
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
