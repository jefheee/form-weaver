export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
];

export async function POST(req: Request) {
  try {
    const { url, answers } = await req.json();
    
    const submitUrl = url.replace(/\/viewform.*/, '/formResponse');
    
    const params = new URLSearchParams();
    
    for (const [key, value] of Object.entries(answers)) {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    }
    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const res = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': randomUserAgent,
        'Referer': url,
        'Origin': new URL(url).origin,
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      body: params.toString()
    });

    if (!res.ok) {
      throw new Error(`Google recusou a submissão. HTTP Status: ${res.status}`);
    }

    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  } catch (error: any) {
    console.error('Submit error:', error.message);
    return NextResponse.json({ error: 'Erro ao injetar submissão.' }, { status: 500 });
  }
}
