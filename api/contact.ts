import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos faltantes' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'faustinognavi@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 0.5px;">Nuevo mensaje desde tu portfolio</h1>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Info del contacto -->
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                  <p style="margin: 0 0 12px 0; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">De</p>
                  <p style="margin: 0 0 20px 0; color: #333333; font-size: 18px; font-weight: 600;">${name}</p>
                  
                  <p style="margin: 0 0 8px 0; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                </div>

                <!-- Mensaje -->
                <div>
                  <p style="margin: 0 0 12px 0; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
                  <div style="background-color: #fafafa; padding: 20px; border-radius: 6px; border: 1px solid #eeeeee; color: #333333; line-height: 1.6; font-size: 15px; white-space: pre-wrap; word-wrap: break-word;">
${message}
                  </div>
                </div>

              </div>

              <!-- Divider -->
              <div style="height: 1px; background-color: #eeeeee; margin: 0 30px;"></div>

              <!-- Footer -->
              <div style="padding: 30px; background-color: #f8f9fa; text-align: center; font-size: 12px; color: #999999;">
                <p style="margin: 0 0 10px 0;">
                  <span style="color: #667eea; font-weight: 600;">Portfolio</span> • Contacto profesional
                </p>
                <p style="margin: 0; font-size: 11px;">
                  Este es un mensaje de contacto desde tu sitio de portfolio.
                </p>
              </div>

            </div>
          </body>
        </html>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar email' });
  }
}
