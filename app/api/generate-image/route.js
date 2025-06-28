// src/app/api/generate-image/route.js
export const runtime = 'nodejs'; 
import { NextResponse } from 'next/server';
//sua loi
export async function POST(request) {
  try {
    const body = await request.json();
    const apiKeys = [
      process.env.OPENAI_API_KEY_1,
      process.env.OPENAI_API_KEY_2,
      process.env.OPENAI_API_KEY_3,
      process.env.OPENAI_API_KEY_4,
      process.env.OPENAI_API_KEY_5,
      process.env.OPENAI_API_KEY_6,
      process.env.OPENAI_API_KEY_7,
      process.env.OPENAI_API_KEY_8,
      process.env.OPENAI_API_KEY_9,
      process.env.OPENAI_API_KEY_10,
    ];

    // Lấy ngẫu nhiên 1 key
    const randomIndex = Math.floor(Math.random() * apiKeys.length);
    const randomKey = apiKeys[randomIndex];

    // Thực hiện gọi API đến OpenAI
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${randomKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Đã xảy ra lỗi khi gọi GPT-4 Generate Image");
    }
    const res = NextResponse.json(data);
    // Cấu hình CORS để cho phép client từ bất kỳ domain nào
    res.headers.set('Access-Control-Allow-Origin', '*'); 
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  } catch (error) {
    console.error("Full error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  const res = NextResponse.json({ message: "Generate Image API is live." });
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}
// OPTIONS: để hỗ trợ preflight CORS
export async function OPTIONS() {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  };

