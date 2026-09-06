import { NextResponse } from 'next/server';

interface EnquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  product: string;
  requiredCapacity: string;
  materialOfConstruction: string;
  quantity: string;
  application: string;
  technicalRequirement: string;
  deliveryTimeline: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: EnquiryData = await request.json();

    if (!body.name || !body.email || !body.phone || !body.product) {
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
    // For now, log the enquiry
    console.log('New Enquiry:', {
      ...body,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Your enquiry has been received. Our team will contact you shortly.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
