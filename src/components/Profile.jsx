export default function Profile({ favoritesCount, onViewFavorites }) {
  return (
    <div className="screen">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div className="avatar lg">VC</div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Seu perfil</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-muted)' }}>
          ⭐ 4.8 · 12 serviços anunciados
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-card__value">230</p>
          <p className="stat-card__label">Visualizações</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">18</p>
          <p className="stat-card__label">Contatos</p>
        </div>
      </div>

      <button className="btn-secondary">Editar perfil</button>
      <button className="btn-secondary" onClick={onViewFavorites}>
        Favoritos {favoritesCount > 0 ? `(${favoritesCount})` : ''}
      </button>
      <button className="btn-secondary">Meus anúncios</button>
    </div>
  )
}
