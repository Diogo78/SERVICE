export default function ServiceDetail({ service, onBack, onContact }) {
  if (!service) return null

  return (
    <div className="screen">
      <button className="back-link" onClick={onBack}>← Voltar</button>

      <div
        style={{
          height: 140,
          borderRadius: 14,
          background: 'var(--color-primary-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 44,
          marginBottom: 14
        }}
      >
        {service.icon}
      </div>

      <h1 className="screen-title" style={{ marginBottom: 2 }}>{service.title}</h1>
      <p style={{ color: 'var(--color-accent)', fontWeight: 500, margin: '0 0 8px' }}>
        {service.price}
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 14 }}>
        ⭐ {service.rating} · {service.reviews} avaliações
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 14
        }}
      >
        <div className="avatar">
          {service.provider.split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{service.provider}</p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-muted)' }}>Responde rápido</p>
        </div>
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: 20 }}>
        {service.description}
      </p>

      <button className="btn-primary" onClick={() => onContact(service)}>
        Solicitar orçamento
      </button>
    </div>
  )
}
