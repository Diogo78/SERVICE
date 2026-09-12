import { useState } from 'react'
import {
  ipCategories, ipOpportunities, ipMyReferrals, ipWallet, ipRanking
} from '../data/indicaPlusData'

const theme = {
  bg: '#0B0B0F',
  surface: '#17171F',
  border: '#2A2A34',
  text: '#F5F5F7',
  muted: '#8B8B95',
  accent: '#00D68F',
  gold: '#FFD166'
}

const statusColor = (status) => {
  if (status.includes('paga') || status.includes('confirmada')) return theme.accent
  if (status.includes('recusada')) return '#FF6B6B'
  return theme.gold
}

function IPHeader({ title, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.muted, fontSize: 16 }}>←</button>
      )}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: theme.text, margin: 0 }}>
        {title}
      </h2>
    </div>
  )
}

function IPSubNav({ screen, onChange }) {
  const tabs = [
    { key: 'home', label: 'Início' },
    { key: 'explore', label: 'Explorar' },
    { key: 'mine', label: 'Indicações' },
    { key: 'wallet', label: 'Carteira' },
    { key: 'ranking', label: 'Ranking' }
  ]
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 18 }}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            flexShrink: 0,
            fontSize: 12,
            padding: '7px 12px',
            borderRadius: 999,
            border: `1px solid ${screen === t.key ? theme.accent : theme.border}`,
            background: screen === t.key ? theme.accent : 'transparent',
            color: screen === t.key ? '#04231A' : theme.muted,
            fontWeight: 600
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default function IndicaPlus() {
  const [screen, setScreen] = useState('home')
  const [selected, setSelected] = useState(null)
  const [sent, setSent] = useState(false)

  const goTo = (s) => { setSelected(null); setSent(false); setScreen(s) }

  let body

  if (selected && screen === 'detail') {
    body = (
      <div>
        <IPHeader title={selected.titulo} onBack={() => setScreen('explore')} />
        <p style={{ fontSize: 12, color: theme.accent, fontWeight: 600, marginBottom: 4 }}>{selected.empresa}</p>
        <p style={{ fontSize: 13, color: theme.muted, marginBottom: 10 }}>{selected.categoria} · {selected.vagas} vagas restantes</p>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <p style={{ fontSize: 11, color: theme.muted, margin: '0 0 2px' }}>Comissão</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: theme.accent, margin: 0 }}>{selected.comissao}</p>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: theme.muted, marginBottom: 20 }}>{selected.descricao}</p>
        {!sent ? (
          <button
            onClick={() => setSent(true)}
            style={{ width: '100%', background: theme.accent, color: '#04231A', border: 'none', borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 700 }}
          >
            Indicar um cliente
          </button>
        ) : (
          <div style={{ background: theme.surface, border: `1px solid ${theme.accent}`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 13, color: theme.accent, fontWeight: 600 }}>Indicação enviada ✓</p>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: theme.muted }}>Acompanhe o status em "Indicações"</p>
          </div>
        )}
      </div>
    )
  } else if (screen === 'explore') {
    body = (
      <div>
        <IPHeader title="Explorar oportunidades" />
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14 }}>
          {ipCategories.slice(0, 6).map((c) => (
            <span key={c} style={{ flexShrink: 0, fontSize: 11, padding: '5px 10px', borderRadius: 999, border: `1px solid ${theme.border}`, color: theme.muted }}>{c}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ipOpportunities.map((op) => (
            <button
              key={op.id}
              onClick={() => { setSelected(op); setScreen('detail') }}
              style={{ textAlign: 'left', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}
            >
              <p style={{ fontSize: 11, color: theme.accent, fontWeight: 600, margin: '0 0 4px' }}>{op.empresa}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: '0 0 6px' }}>{op.titulo}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: theme.gold, fontWeight: 600 }}>{op.comissao}</span>
                <span style={{ fontSize: 11, color: theme.muted }}>{op.vagas} vagas</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  } else if (screen === 'mine') {
    body = (
      <div>
        <IPHeader title="Minhas indicações" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ipMyReferrals.map((r) => (
            <div key={r.id} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: theme.text, margin: '0 0 6px' }}>{r.oportunidade}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(r.status) }}>{r.status}</span>
                <span style={{ fontSize: 11, color: theme.muted }}>{r.data}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else if (screen === 'wallet') {
    body = (
      <div>
        <IPHeader title="Carteira" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div style={{ background: theme.accent, borderRadius: 14, padding: 14 }}>
            <p style={{ fontSize: 11, color: '#04231A', margin: '0 0 4px', opacity: 0.8 }}>Disponível</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#04231A', margin: 0 }}>R$ {ipWallet.saldoDisponivel.toFixed(2)}</p>
          </div>
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
            <p style={{ fontSize: 11, color: theme.muted, margin: '0 0 4px' }}>Pendente</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: theme.text, margin: 0 }}>R$ {ipWallet.saldoPendente.toFixed(2)}</p>
          </div>
        </div>
        <button style={{ width: '100%', background: theme.text, color: theme.bg, border: 'none', borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
          Solicitar saque PIX
        </button>
        <p style={{ fontSize: 11, fontWeight: 700, color: theme.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>Histórico</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ipWallet.transacoes.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${theme.border}` }}>
              <div>
                <p style={{ fontSize: 12, color: theme.text, margin: 0 }}>{t.tipo}</p>
                <p style={{ fontSize: 10, color: theme.muted, margin: 0 }}>{t.data}</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: t.valor > 0 ? theme.accent : '#FF6B6B' }}>
                {t.valor > 0 ? '+' : ''}R$ {t.valor.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  } else if (screen === 'ranking') {
    body = (
      <div>
        <IPHeader title="Ranking" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ipRanking.geral.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, background: theme.surface,
              border: `1px solid ${p.nome === 'Você' ? theme.accent : theme.border}`, borderRadius: 14, padding: 12
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: theme.muted, width: 20 }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: theme.text, margin: 0 }}>{p.nome}</p>
                <p style={{ fontSize: 10, color: theme.gold, margin: 0 }}>{p.nivel}</p>
              </div>
              <span style={{ fontSize: 12, color: theme.muted }}>{p.pontos} pts</span>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    const minhas = ipMyReferrals.length
    const confirmadas = ipMyReferrals.filter((r) => r.status.includes('confirmada') || r.status.includes('paga')).length
    body = (
      <div>
        <div style={{ marginBottom: 4 }}>
          <p style={{ fontSize: 11, color: theme.muted, margin: 0, letterSpacing: 1 }}>INDICA+</p>
          <p style={{ fontSize: 12, color: theme.accent, margin: '2px 0 16px', fontWeight: 500 }}>Indique. Conecte. Ganhe.</p>
        </div>

        <div style={{ background: `linear-gradient(135deg, ${theme.accent}, #00A876)`, borderRadius: 16, padding: 18, marginBottom: 14 }}>
          <p style={{ fontSize: 11, color: '#04231A', opacity: 0.8, margin: '0 0 4px' }}>Saldo disponível</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#04231A', margin: 0 }}>
            R$ {ipWallet.saldoDisponivel.toFixed(2)}
          </p>
          <p style={{ fontSize: 11, color: '#04231A', opacity: 0.75, margin: '4px 0 0' }}>
            Total ganho: R$ {ipWallet.totalRecebido.toFixed(2)}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: theme.text, margin: 0 }}>{minhas}</p>
            <p style={{ fontSize: 10, color: theme.muted, margin: '4px 0 0' }}>Indicações feitas</p>
          </div>
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: theme.text, margin: 0 }}>{confirmadas}</p>
            <p style={{ fontSize: 10, color: theme.muted, margin: '4px 0 0' }}>Vendas confirmadas</p>
          </div>
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: theme.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 10 }}>
          Oportunidades recomendadas
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ipOpportunities.slice(0, 2).map((op) => (
            <button
              key={op.id}
              onClick={() => { setSelected(op); setScreen('detail') }}
              style={{ textAlign: 'left', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 13 }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: theme.text, margin: '0 0 4px' }}>{op.titulo}</p>
              <span style={{ fontSize: 12, color: theme.gold, fontWeight: 600 }}>{op.comissao}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="screen" style={{ background: theme.bg, margin: '-1px', borderRadius: 0 }}>
      <div style={{ background: theme.bg, minHeight: '100%', padding: '4px 0 16px' }}>
        <IPSubNav screen={screen === 'detail' ? 'explore' : screen} onChange={goTo} />
        {body}
      </div>
    </div>
  )
}
