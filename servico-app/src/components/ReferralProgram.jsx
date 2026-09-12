import { useState } from 'react'

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false)
  const code = 'VC-8H21K'

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Indique e ganhe</h1>

      <div
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: 20,
          marginBottom: 18,
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 6px' }}>Você já indicou</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, margin: 0 }}>3 pessoas</p>
        <p style={{ fontSize: 12, opacity: 0.85, margin: '6px 0 0' }}>Ganhe recompensas a cada indicação que se cadastrar</p>
      </div>

      <label className="field-label">Seu código de indicação</label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-surface)',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          marginBottom: 14
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: 1 }}>{code}</span>
        <button
          onClick={handleCopy}
          style={{ border: 'none', background: 'none', color: 'var(--color-accent)', fontSize: 13, fontWeight: 600 }}
        >
          {copied ? 'Copiado ✓' : 'Copiar'}
        </button>
      </div>

      <button className="btn-primary" style={{ marginBottom: 20 }}>Compartilhar convite</button>

      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        Como funciona
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          'Compartilhe seu código com quem você conhece',
          'A pessoa se cadastra usando seu código',
          'Vocês dois ganham recompensa quando ela publicar ou contratar um serviço'
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div className="avatar" style={{ width: 24, height: 24, fontSize: 11 }}>{i + 1}</div>
            <p style={{ fontSize: 13, margin: 0, color: 'var(--color-text-muted)' }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
