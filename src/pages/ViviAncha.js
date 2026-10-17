import React from 'react';
import './ViviAncha.css';

export default function ViviAncha() {
  return (
    <div className="vivi-page">
      <div className="vivi-hero">
        <h1 className="vivi-title">VIVI anCHA</h1>
      </div>
      <div className="vivi-body container">
        <div className="vivi-manifesto">
          <p>anCHA nace de un encuentro magnético, casi ineludible.</p>
          <p>De una forma compartida de transitar la vida: con naturalidad, ligereza y libertad. Aceptando lo que viene, dando espacio a cada forma y aprendiendo a percibir la realidad tal cual es.</p>
          <p>Sin forzar. Sin apretar. Sin encajar.</p>
          <p>Creemos en habitar el presente, movernos con libertad y hacer lugar a lo que somos.</p>
          <p className="vivi-cierre">Hoy. Acá. Ahora.</p>
          <p className="vivi-firma">VIVI anCHA.</p>
        </div>
      </div>
    </div>
  );
}
