function FeatureCard({ title, description, badge }) {
  return (
    <article className="feature-card">
      <span className="feature-badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default FeatureCard;
