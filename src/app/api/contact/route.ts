import { NextResponse } from 'next/server';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactData = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // TODO: In production, save to database and/or send email
    console.log('New Contact Message:', {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent. We will respond shortly.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
