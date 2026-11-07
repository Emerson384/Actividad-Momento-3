import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Plataforma de operación inteligente</span>
          <h1>
            Convierte la información en acción con <span>NovaFlow</span>
          </h1>
          <p>
            Diseñada para equipos que necesitan organizar proyectos, automatizar tareas y tomar decisiones basadas en datos en tiempo real.
          </p>
          <div className="hero-actions">
            <Link to="/soluciones" className="primary-button">Comenzar ahora</Link>
            <Link to="/soluciones" className="secondary-button">Ver soluciones</Link>
          </div>

          <div className="metrics-row">
            <div className="metric-box">
              <strong>42%</strong>
              <span>menos tiempo operativo</span>
            </div>
            <div className="metric-box">
              <strong>3.4x</strong>
              <span>más productividad</span>
            </div>
            <div className="metric-box">
              <strong>24/7</strong>
              <span>monitoreo inteligente</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          {/* Ilustración o panel decorativo */}
          <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--primary-dark)', fontWeight: '700', fontSize: '1.2rem' }}>[ Panel Operativo NovaFlow ]</span>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="insights-section">
        <div className="section-heading">
          <span className="eyebrow">Soluciones para operar mejor</span>
          <h2>Un ecosistema pensado para crecer con tu negocio</h2>
        </div>

        <div className="insights-grid">
          <div className="feature-cards">
            <div className="feature-card">
              <span className="feature-badge">E1</span>
              <h3>Visibilidad total</h3>
              <p>Centraliza procesos, prioridades y métricas para que cada equipo comprenda el estado real del negocio.</p>
            </div>
            <div className="feature-card">
              <span className="feature-badge">E2</span>
              <h3>Automatización con propósito</h3>
              <p>Reduce tareas repetitivas con reglas inteligentes que mantienen la ejecución constante y sin fricción.</p>
            </div>
            <div className="feature-card">
              <span className="feature-badge">E3</span>
              <h3>Análisis accionable</h3>
              <p>Transforma indicadores en decisiones claras con reportes visuales diseñados para líderes de operación.</p>
            </div>
          </div>

          <div className="sidebar-panel">
            <span className="sidebar-label">Panel Operativo</span>
            <h3>Plan de acción</h3>
            <ul className="sidebar-list">
              <li>Integración de datos</li>
              <li className="active">Automatización inteligente</li>
              <li>Alertas y seguimiento</li>
              <li>Indicadores ejecutivos</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;