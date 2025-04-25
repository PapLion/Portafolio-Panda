import { Resend } from 'resend';

const resend = new Resend('re_Z9NE8zTx_GJG7N3hBMmPkGYd6bYc7ZyZy');

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'estudiantedanilolopez@gmail.com',
      reply_to: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      
      // Manejo específico para errores de validación de Resend
      if (error.statusCode === 403 && error.name === 'validation_error') {
        return res.status(403).json({ 
          message: 'Error de configuración del servidor de correo. Por favor, contacta al administrador.',
          details: error
        });
      }
      
      return res.status(400).json({ 
        message: 'Error al enviar el email',
        details: error
      });
    }

    return res.status(200).json({ 
      message: 'Email sent successfully',
      data 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error.message
    });
  }
} 