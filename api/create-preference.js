// Vercel Serverless Function — crea preferencia de Mercado Pago
// Variables de entorno necesarias en Vercel Dashboard > Settings > Environment Variables:
//   MP_ACCESS_TOKEN = tu Access Token de producción de Mercado Pago

const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, payer } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items requeridos' });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const preference = new Preference(client);

  try {
    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id:          item.id,
          title:       `${item.name} · ${item.color || ''} · Talle ${item.size}`,
          quantity:    item.qty || 1,
          unit_price:  item.price,
          currency_id: 'ARS',
        })),
        payer: payer || {},
        back_urls: {
          success: `${process.env.SITE_URL || 'https://ancha-web.vercel.app'}/carrito?pago=ok`,
          failure: `${process.env.SITE_URL || 'https://ancha-web.vercel.app'}/carrito?pago=error`,
          pending: `${process.env.SITE_URL || 'https://ancha-web.vercel.app'}/carrito?pago=pendiente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'anCHA',
      },
    });

    return res.status(200).json({ id: result.id, init_point: result.init_point });
  } catch (err) {
    console.error('MP error:', err);
    return res.status(500).json({ error: 'Error al crear preferencia' });
  }
};
