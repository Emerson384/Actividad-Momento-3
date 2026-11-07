function Sidebar() {
  const items = [
    'Integración de datos',
    'Automatización inteligente',
    'Alertas y seguimiento',
    'Indicadores ejecutivos',
  ];

  return (
    <aside className="sidebar-panel">
      <p className="sidebar-label">Panel operativo</p>
      <h3>Plan de acción</h3>
      <ul className="sidebar-list">
        {items.map((item, index) => (
          <li key={item} className={index === 1 ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
