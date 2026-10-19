import React, { useState } from 'react';
import './SizeGuide.css';

const PDF_MAP = {
  barefoot: '/plantillas-barefoot.pdf',
  zonda:    '/plantillas-zonda.pdf',
  delta:    '/plantillas-delta.pdf',
};

export default function SizeGuide({ type = 'barefoot' }) {
  const [open, setOpen] = useState(false);
  const pdf = PDF_MAP[type] || PDF_MAP.barefoot;

  return (
    <div className="sg">
      <button className="sg__toggle" onClick={() => setOpen(v => !v)}>
        Guía de talles <span className="sg__arrow">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="sg__body">
          <p className="sg__note">
            Imprimí al 100% (sin ajustar a página) en hoja oficio y compará con tu pie descalzo sobre la plantilla.
          </p>
          <div className="sg__pdf-wrap">
            <embed src={pdf} type="application/pdf" className="sg__pdf" />
          </div>
          <a href={pdf} target="_blank" rel="noreferrer" className="sg__download">
            Descargar PDF →
          </a>
        </div>
      )}
    </div>
  );
}
