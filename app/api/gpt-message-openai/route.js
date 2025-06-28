import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    // body chứa { model, messages: [ {role, content}, ... ] }

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
    if (!apiKeys.length) throw new Error("No API keys");

    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${randomKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Error calling GPT-4");
    }
    console.log("GPT Payload:", JSON.stringify(body, null, 2));
    const res = NextResponse.json(data);
    // Cấu hình CORS để cho phép client từ bất kỳ domain nào
    res.headers.set('Access-Control-Allow-Origin', '*'); 
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  const res = NextResponse.json({ message: "GPT Message API is live." });
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