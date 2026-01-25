import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { nombre, email, telefono, descripcion, turnstileToken } = body;

    // 1. Validate Turnstile Token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Turnstile token missing' },
        { status: 400 },
      );
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(
          process.env.TURNSTILE_SECRET_KEY || '',
        )}&response=${encodeURIComponent(turnstileToken)}`,
      },
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'Invalid captcha validation' },
        { status: 400 },
      );
    }

    // 2. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Nuven Contact <onboarding@resend.dev>', // Change this to your verified domain in production
      to: [process.env.CONTACT_RECIPIENT_EMAIL || ''],
      subject: `Nuevo mensaje de contacto: ${nombre}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${descripcion}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
