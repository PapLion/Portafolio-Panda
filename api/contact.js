import { Resend } from 'resend';

// API Key moved to environment variable - NEVER hardcode secrets
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on cold start, but sufficient for basic protection)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Allowed origin for CORS (restrict to your domain)
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://danidev.vercel.app';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize HTML to prevent XSS in email content
function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Rate limiting check
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean old entries
  for (const [key, data] of rateLimitMap.entries()) {
    if (data.timestamp < windowStart) {
      rateLimitMap.delete(key);
    }
  }
  
  const clientData = rateLimitMap.get(ip);
  
  if (!clientData) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (clientData.timestamp < windowStart) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  return true;
}

export default async function handler(req, res) {
  // Get client IP for rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.headers['x-real-ip'] || 
                   req.connection?.remoteAddress || 
                   'unknown';
  
  // Set CORS headers - restricted to allowed origin only
  const origin = req.headers.origin;
  if (origin === ALLOWED_ORIGIN || process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check rate limit
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ 
      message: 'Too many requests. Please try again later.' 
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    const errors = {};
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.name = 'Name is required';
    } else if (name.trim().length > 100) {
      errors.name = 'Name is too long (max 100 characters)';
    }
    
    if (!email || typeof email !== 'string') {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      errors.message = 'Message is required';
    } else if (message.trim().length > 5000) {
      errors.message = 'Message is too long (max 5000 characters)';
    }
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }

    // Sanitize inputs for HTML email
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = sanitizeHtml(email.trim());
    const sanitizedMessage = sanitizeHtml(message.trim());

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'estudiantedanilolopez@gmail.com',
      reply_to: email.trim(),
      subject: `Nuevo mensaje de ${sanitizedName}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      // Log error server-side for debugging
      console.error('Resend API error:', error);
      
      // Return generic error to client - don't expose internal details
      return res.status(500).json({ 
        message: 'Unable to send message. Please try again later.'
      });
    }

    return res.status(200).json({ 
      message: 'Message sent successfully'
    });
  } catch (error) {
    // Log error server-side
    console.error('Server error:', error);
    
    // Return generic error - don't expose internal details
    return res.status(500).json({ 
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
