import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { FORM_TOKEN, FORM_ID, API_BASE_URL } = process.env;

    if (!FORM_TOKEN || !FORM_ID || !API_BASE_URL) {
      return NextResponse.json({ error: 'Missing environment configuration' }, { status: 500 });
    }

    const backendUrl = `${API_BASE_URL}/public/forms/${FORM_ID}/submit`;

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: FORM_TOKEN, data: body }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
