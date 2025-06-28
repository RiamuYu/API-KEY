// app/api/gpt-vision/route.js
export const runtime = 'nodejs'; 
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Lấy payload từ request
    const body = await request.json();
    // Kiểm tra dữ liệu đầu vào (optional, tùy vào yêu cầu của bạn)
    if (!body.model || !body.messages || !Array.isArray(body.messages)) {
      throw new Error("Thiếu thông tin cần thiết trong request.");
    }
    // 2. Danh sách API Key (lấy từ biến môi trường)
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
    ].filter(Boolean);

    if (!apiKeys.length) {
      throw new Error("Không có API key khả dụng!");
    }
    // 3. Random 1 key từ danh sách API Key
    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];
    // 4. Gọi endpoint Chat Completions Vision từ OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${randomKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // 5. Kiểm tra phản hồi và trả về lỗi nếu có
    if (!response.ok) {
      throw new Error(data.error?.message || "Đã xảy ra lỗi khi gọi GPT-4 Vision");
    }
    // 6. Trả về CORS headers và data nhận được từ OpenAI
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
  const res = NextResponse.json({ message: "GPT Vision API is live." });
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