import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    // body chứa { model, messages: [ {role, content}, ... ] }

    const apiKeys = [
      process.env.DEEPSEEK_API_KEY_1,
      process.env.DEEPSEEK_API_KEY_2,
      process.env.DEEPSEEK_API_KEY_3,
    ].filter(Boolean);

    if (!apiKeys.length) {
      console.error("No API keys found.");
      throw new Error("No API keys available");
    }

    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    // Gọi API DeepSeek
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${randomKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: body.model || "deepseek-chat",
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error from DeepSeek API:", data);
      throw new Error(data.error?.message || "Unknown error from DeepSeek API");
    }
    const res = NextResponse.json(data);
    // Cấu hình CORS để cho phép client từ bất kỳ domain nào
    res.headers.set('Access-Control-Allow-Origin', '*'); 
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  } catch (error) {
    console.error("Error occurred in DeepSeek API call:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  const res = NextResponse.json({ message: "DeepSeek API is live." });
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
