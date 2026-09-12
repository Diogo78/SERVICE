import { useState } from 'react'
import { categories, services } from '../data/mockServices'

export default function Home({ onOpenService, favorites, onToggleFavorite, onOpenMessages }) {
  const [activeCategory, setActiveCategory] = useState('Eventos')
  const [query, setQuery] = useState('')

  const filtered = services.filter((s) => {
    const matchesCategory = s.category === activeCategory
    const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="screen">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 className="screen-title">Buscar serviços</h1>
        <button
          onClick={onOpenMessages}
          style={{ border: 'none', background: 'none', fontSize: 20, marginBottom: 16 }}
          aria-label="Mensagens"
        >
          💬
        </button>
      </div>

      <div className="search-bar">
        <span>🔍</span>
        <input
          placeholder="Ex: eletricista, buffet..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="chip-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card-list">
        {filtered.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
            Nenhum serviço encontrado nessa categoria ainda.
          </p>
        )}
        {filtered.map((service) => (
          <button
            key={service.id}
            className="service-card"
            onClick={() => onOpenService(service)}
          >
            <div className="service-card__thumb">{service.icon}</div>
            <div className="service-card__body">
              <p className="service-card__title">{service.title}</p>
              <p className="service-card__price">{service.price}</p>
              <p className="service-card__meta">⭐ {service.rating} ({service.reviews})</p>
            </div>
            <span
              className={`fav-btn ${favorites.includes(service.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(service.id)
              }}
            >
              ♥
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
