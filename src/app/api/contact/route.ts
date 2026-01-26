import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { nombre, email, telefono, descripcion, turnstileToken } = body;

    // 0. Environment Validation
    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error('Missing TURNSTILE_SECRET_KEY');
      return NextResponse.json(
        { error: 'Error de configuración del servidor (Turnstile)' },
        { status: 500 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json(
        { error: 'Error de configuración del servidor (Resend)' },
        { status: 500 },
      );
    }

    // 1. Validate Turnstile Token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Falta el token de verificación' },
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
          process.env.TURNSTILE_SECRET_KEY,
        )}&response=${encodeURIComponent(turnstileToken)}`,
      },
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error('Turnstile verification failed:', verifyData);
      return NextResponse.json(
        { error: 'La verificación de seguridad ha fallado' },
        { status: 400 },
      );
    }

    // 2. Send Email via Resend
    const recipient =
      process.env.CONTACT_RECIPIENT_EMAIL || 'contacto@nuven.com.ar';
    const { error } = await resend.emails.send({
      from: 'Nuven Contact <contacto@nuven.com.ar>',
      to: [recipient],
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
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'No se pudo enviar el correo electrónico' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
