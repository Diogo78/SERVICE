import { useState } from 'react'
import { categories } from '../data/mockServices'

const initialForm = { title: '', category: '', description: '', price: '' }

export default function CreateListing() {
  const [form, setForm] = useState(initialForm)
  const [published, setPublished] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setPublished(true)
    setTimeout(() => setPublished(false), 2500)
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Novo anúncio</h1>

      <form onSubmit={handleSubmit}>
        <div className="photo-upload">
          <span style={{ fontSize: 20 }}>📷</span>
          <span>Adicionar fotos</span>
        </div>

        <label className="field-label">Título</label>
        <input
          className="field-input"
          placeholder="Ex: Eletricista residencial"
          value={form.title}
          onChange={update('title')}
        />

        <label className="field-label">Categoria</label>
        <select className="field-select" value={form.category} onChange={update('category')}>
          <option value="">Selecionar</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="field-label">Descrição</label>
        <textarea
          className="field-textarea"
          placeholder="Descreva o que está incluso no serviço..."
          value={form.description}
          onChange={update('description')}
        />

        <label className="field-label">Preço</label>
        <input
          className="field-input"
          placeholder="Ex: A partir de R$ 100"
          value={form.price}
          onChange={update('price')}
        />

        <button className="btn-primary" type="submit">
          {published ? 'Anúncio publicado ✓' : 'Publicar anúncio'}
        </button>
      </form>
    </div>
  )
}
