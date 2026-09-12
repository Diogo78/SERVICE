import { useState } from 'react'
import { categories } from '../data/mockServices'

const demandsMock = [
  {
    id: 1,
    company: 'Buffet Sabor & Cia',
    need: 'Procura fotógrafo para eventos corporativos',
    category: 'Eventos',
    posted: 'há 2 dias'
  },
  {
    id: 2,
    company: 'Studio Ana',
    need: 'Precisa de recepcionista freelancer para dia de casamento',
    category: 'Eventos',
    posted: 'há 5 dias'
  }
]

export default function BusinessLeads() {
  const [showForm, setShowForm] = useState(false)
  const [need, setNeed] = useState('')
  const [category, setCategory] = useState('')

  return (
    <div className="screen">
      <h1 className="screen-title">Indicações — empresas</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: -8, marginBottom: 16 }}>
        Empresas publicam o que precisam e prestadores podem se candidatar.
      </p>

      {!showForm ? (
        <button className="btn-primary" style={{ marginBottom: 18 }} onClick={() => setShowForm(true)}>
          + Publicar demanda da minha empresa
        </button>
      ) : (
        <div style={{ marginBottom: 18 }}>
          <label className="field-label">O que sua empresa precisa?</label>
          <textarea
            className="field-textarea"
            placeholder="Ex: Precisamos de um eletricista para manutenção mensal"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
          />
          <label className="field-label">Categoria</label>
          <select className="field-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Selecionar</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="btn-primary" onClick={() => setShowForm(false)}>Publicar</button>
        </div>
      )}

      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        Demandas abertas
      </p>

      <div className="card-list">
        {demandsMock.map((d) => (
          <div key={d.id} className="service-card" style={{ alignItems: 'flex-start' }}>
            <div className="service-card__thumb">🏢</div>
            <div className="service-card__body">
              <p className="service-card__title">{d.company}</p>
              <p style={{ fontSize: 13, color: 'var(--color-text)', margin: '3px 0' }}>{d.need}</p>
              <p className="service-card__meta">{d.category} · {d.posted}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
