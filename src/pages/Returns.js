import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { COLORS, SIZES_CALZADO, calzado } from '../data/products';
import './Returns.css';

// ─── Configuración EmailJS ───────────────────────────────────────────────────
// Para activar el envío de emails:
// 1. Crear cuenta gratis en https://www.emailjs.com
// 2. Crear un servicio de email (conectar viviancha.ar@gmail.com)
// 3. Crear una plantilla con las variables: {{nombre}}, {{email}}, {{modelo}},
//    {{color_tiene}}, {{talle_tiene}}, {{color_quiere}}, {{talle_quiere}}, {{motivo}}
// 4. Reemplazar los valores de abajo con los IDs reales
const EMAILJS_SERVICE_ID  = 'service_nzpelnk';
const EMAILJS_TEMPLATE_ID = 'template_v27tu8t';
const EMAILJS_PUBLIC_KEY  = '8nHj4qUv_chBr6Qsz';

const MODELOS = [
  { label: 'Maitén',  id: 'maiten'  },
  { label: 'Manso',   id: 'manso'   },
  { label: 'Mara',    id: 'mara'    },
  { label: 'Caldén',  id: 'calden'  },
  { label: 'Bacán',   id: 'bacan'   },
  { label: 'Delta',   id: 'delta'   },
  { label: 'Zonda',   id: 'zonda'   },
];
const COLORES = Object.entries(COLORS).map(([k, v]) => ({ key: k, ...v }));
const MOTIVOS = ['Talle incorrecto', 'Color incorrecto', 'Defecto de fabricación', 'Cambio de opinión', 'Otro'];

export default function Returns() {
  const [user, setUser]   = useState(null);
  const [step, setStep]   = useState(1); // 1=login, 2=form, 3=ok
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [solicitud, setSolicitud] = useState('');
  const [form, setForm]   = useState({
    modeloTiene: '', modeloQuiere: '', colorTiene: '', talleTiene: '', colorQuiere: '', talleQuiere: '', motivo: '', comentario: '',
  });

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleGoogle = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser({ name: decoded.name, email: decoded.email, picture: decoded.picture });
    setStep(2);
  };

  // Diferencia de precio entre modelos
  const priceTiene  = calzado.find(p => p.id === form.modeloTiene)?.price || 0;
  const priceQuiere = calzado.find(p => p.id === form.modeloQuiere)?.price || 0;
  const diferencia  = priceQuiere - priceTiene;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const id = `ACH-${Math.floor(10000 + Math.random() * 90000)}`;
    const modeloTieneLabel  = MODELOS.find(m => m.id === form.modeloTiene)?.label  || form.modeloTiene;
    const modeloQuiereLabel = MODELOS.find(m => m.id === form.modeloQuiere)?.label || form.modeloQuiere;
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre:         user.name,
          email:          user.email,
          modelo:         modeloTieneLabel,
          modelo_quiere:  modeloQuiereLabel,
          color_tiene:    COLORS[form.colorTiene]?.label || form.colorTiene,
          talle_tiene:    form.talleTiene,
          color_quiere:   COLORS[form.colorQuiere]?.label || form.colorQuiere,
          talle_quiere:   form.talleQuiere,
          motivo:         form.motivo,
          comentario:     form.comentario,
          diferencia:     diferencia > 0 ? `+$${diferencia.toLocaleString('es-AR')}` : diferencia < 0 ? `-$${Math.abs(diferencia).toLocaleString('es-AR')}` : 'Sin diferencia',
          solicitud_id:   id,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSolicitud(id);
      setStep(3);
    } catch {
      setError('Hubo un error al enviar. Escribinos directamente a viviancha.ar@gmail.com');
    } finally {
      setSending(false);
    }
  };

  // ── Paso 3: confirmación ──
  if (step === 3) return (
    <div className="returns-page">
      <div className="returns-success container">
        <div className="returns-success__icon">✓</div>
        <p className="returns-success__eyebrow">Solicitud recibida</p>
        <h2>¡Tu cambio está en camino!</h2>
        <p>Hola <strong>{user?.name}</strong>, en 24–48 hs hábiles te contactamos a <strong>{user?.email}</strong> con las instrucciones para enviarnos el paquete.</p>
        <p className="returns-success__note">N° de solicitud: <strong>{solicitud}</strong></p>

        <div className="returns-shipping">
          <p className="returns-shipping__title">Datos para el envío</p>
          <div className="returns-shipping__box">
            <div className="returns-shipping__dim">
              <span>Alto</span><strong>10 cm</strong>
            </div>
            <div className="returns-shipping__dim">
              <span>Ancho</span><strong>16 cm</strong>
            </div>
            <div className="returns-shipping__dim">
              <span>Largo</span><strong>30 cm</strong>
            </div>
          </div>
          <p className="returns-shipping__hint">Usá estos medidas cuando generes el envío en Andreani.</p>
          <a
            href="https://www.andreani.com/personas/envios"
            target="_blank"
            rel="noreferrer"
            className="returns-btn returns-btn--outline"
          >
            Generar envío en Andreani →
          </a>
        </div>

        <div className="returns-success__actions">
          <Link to="/" className="returns-btn">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="returns-page">
      <div className="returns-hero">
        <div className="container">
          <p className="returns-eye">Posventa · anCHA</p>
          <h1 className="returns-title">Portal de cambios</h1>
          <p className="returns-sub">Cambios sin costo dentro de los 30 días de recibido tu pedido.</p>
        </div>
      </div>

      <div className="returns-body container">
        {/* ── Paso 1: Google Sign-In ── */}
        {step === 1 && (
          <div className="returns-card returns-card--center">
            <h2 className="returns-card__title">Identificate para continuar</h2>
            <p className="returns-card__desc">Usamos tu cuenta de Google para pre-completar tus datos. No compartimos tu información.</p>
            <div className="returns-google">
              <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => setError('No pudimos conectar con Google. Intentá de nuevo.')}
                text="continue_with"
                shape="rectangular"
                size="large"
                locale="es"
              />
            </div>
            {error && <p className="returns-error">{error}</p>}
            <p className="returns-card__hint">¿Preferís sin Google? Escribinos a <a href="mailto:viviancha.ar@gmail.com">viviancha.ar@gmail.com</a></p>
          </div>
        )}

        {/* ── Paso 2: formulario ── */}
        {step === 2 && (
          <form className="returns-card" onSubmit={handleSubmit}>
            <div className="returns-user-bar">
              {user?.picture && <img src={user.picture} alt="" className="returns-avatar" referrerPolicy="no-referrer" />}
              <span>{user?.name} · {user?.email}</span>
            </div>

            <h2 className="returns-card__title">¿Qué querés cambiar?</h2>

            {/* Modelo que tenés */}
            <div className="returns-field">
              <label>Modelo que tenés</label>
              <div className="returns-pills">
                {MODELOS.map(m => (
                  <button type="button" key={m.id}
                    className={`returns-pill ${form.modeloTiene === m.id ? 'active' : ''}`}
                    onClick={() => f('modeloTiene', m.id)}>{m.label}</button>
                ))}
              </div>
            </div>

            {/* Color y talle que tiene */}
            <div className="returns-row">
              <div className="returns-field">
                <label>Color que tenés</label>
                <div className="returns-swatches">
                  {COLORES.map(c => (
                    <button type="button" key={c.key}
                      className={`returns-swatch ${form.colorTiene === c.key ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      title={c.label}
                      onClick={() => f('colorTiene', c.key)} />
                  ))}
                </div>
                {form.colorTiene && <p className="returns-selected">{COLORS[form.colorTiene]?.label}</p>}
              </div>
              <div className="returns-field">
                <label>Talle que tenés</label>
                <div className="returns-pills">
                  {SIZES_CALZADO.map(s => (
                    <button type="button" key={s}
                      className={`returns-pill returns-pill--sm ${form.talleTiene === s ? 'active' : ''}`}
                      onClick={() => f('talleTiene', s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modelo que quiere */}
            <div className="returns-field">
              <label>Modelo que querés</label>
              <div className="returns-pills">
                {MODELOS.map(m => (
                  <button type="button" key={m.id}
                    className={`returns-pill ${form.modeloQuiere === m.id ? 'active' : ''}`}
                    onClick={() => f('modeloQuiere', m.id)}>{m.label}</button>
                ))}
              </div>
            </div>

            {/* Color y talle que quiere */}
            <div className="returns-row">
              <div className="returns-field">
                <label>Color que querés</label>
                <div className="returns-swatches">
                  {COLORES.map(c => (
                    <button type="button" key={c.key}
                      className={`returns-swatch ${form.colorQuiere === c.key ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      title={c.label}
                      onClick={() => f('colorQuiere', c.key)} />
                  ))}
                </div>
                {form.colorQuiere && <p className="returns-selected">{COLORS[form.colorQuiere]?.label}</p>}
              </div>
              <div className="returns-field">
                <label>Talle que querés</label>
                <div className="returns-pills">
                  {SIZES_CALZADO.map(s => (
                    <button type="button" key={s}
                      className={`returns-pill returns-pill--sm ${form.talleQuiere === s ? 'active' : ''}`}
                      onClick={() => f('talleQuiere', s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diferencia de precio */}
            {form.modeloTiene && form.modeloQuiere && form.modeloTiene !== form.modeloQuiere && (
              <div className={`returns-diff ${diferencia > 0 ? 'returns-diff--paga' : diferencia < 0 ? 'returns-diff--favor' : 'returns-diff--igual'}`}>
                {diferencia > 0 && <><span>Diferencia a abonar</span><strong>+${diferencia.toLocaleString('es-AR')}</strong></>}
                {diferencia < 0 && <><span>Diferencia a tu favor</span><strong>-${Math.abs(diferencia).toLocaleString('es-AR')}</strong></>}
                {diferencia === 0 && <><span>Sin diferencia de precio</span><strong>✓</strong></>}
              </div>
            )}

            {/* Motivo */}
            <div className="returns-field">
              <label>Motivo</label>
              <div className="returns-pills">
                {MOTIVOS.map(m => (
                  <button type="button" key={m}
                    className={`returns-pill ${form.motivo === m ? 'active' : ''}`}
                    onClick={() => f('motivo', m)}>{m}</button>
                ))}
              </div>
            </div>

            {/* Comentario */}
            <div className="returns-field">
              <label>Comentario (opcional)</label>
              <textarea
                placeholder="Cualquier detalle extra que nos ayude…"
                rows={3}
                value={form.comentario}
                onChange={e => f('comentario', e.target.value)}
              />
            </div>

            {error && <p className="returns-error">{error}</p>}

            <div className="returns-card__actions">
              <button type="button" className="returns-btn--ghost" onClick={() => setStep(1)}>← Volver</button>
              <button
                type="submit"
                className="returns-btn"
                disabled={sending || !form.modeloTiene || !form.modeloQuiere || !form.talleTiene || !form.talleQuiere || !form.motivo}
              >
                {sending ? 'Enviando…' : 'Enviar solicitud'}
              </button>
            </div>
          </form>
        )}

        <div className="returns-info">
          <div className="returns-info__block">
            <h3>Política de cambios</h3>
            <ul>
              <li>30 días desde la recepción del pedido</li>
              <li>El producto debe estar sin uso y con etiquetas</li>
              <li>Un cambio por pedido</li>
            </ul>
          </div>
          <div className="returns-info__block">
            <h3>¿Tenés dudas?</h3>
            <p>Escribinos a <a href="mailto:viviancha.ar@gmail.com">viviancha.ar@gmail.com</a><br />
            o por Instagram <a href="https://instagram.com/viviancha" target="_blank" rel="noreferrer">@viviancha</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
