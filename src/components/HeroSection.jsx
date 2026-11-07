import heroIllustration from '../assets/hero-illustration.svg';

function HeroSection() {
  const metrics = [
    { value: '42%', label: 'menos tiempo operativo' },
    { value: '3.4x', label: 'más productividad' },
    { value: '24/7', label: 'monitoreo inteligente' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Plataforma de operación inteligente</span>
        <h1>
          Convierte la información en acción con <span>{'NovaFlow'}</span>
        </h1>
        <p>
          Diseñada para equipos que necesitan organizar proyectos, automatizar tareas y
          tomar decisiones basadas en datos en tiempo real.
        </p>

        <div className="hero-actions">
          <button type="button" className="primary-button">
            Comenzar ahora
          </button>
          <button type="button" className="secondary-button">
            Ver demo
          </button>
        </div>

        <div className="metrics-row">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-box">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <img src={heroIllustration} alt="Dashboard operativa de NovaFlow" />
      </div>
    </section>
  );
}

export default HeroSection;
