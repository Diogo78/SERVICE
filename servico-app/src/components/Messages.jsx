import { useState } from 'react'

const conversations = [
  { id: 1, name: 'DJ para casamentos', initials: 'DJ', last: 'Posso atender seu evento sim!', time: '14:20' },
  { id: 2, name: 'Buffet para eventos', initials: 'BF', last: 'Segue o orçamento em anexo', time: 'Ontem' }
]

export default function Messages({ openChat, onOpenChat, onBack }) {
  const [messages, setMessages] = useState([
    { from: 'them', text: 'Olá, gostaria de saber mais sobre o serviço.' },
    { from: 'me', text: 'Claro! Posso te enviar um orçamento agora.' }
  ])
  const [draft, setDraft] = useState('')

  if (openChat) {
    const send = () => {
      if (!draft.trim()) return
      setMessages((m) => [...m, { from: 'me', text: draft }])
      setDraft('')
    }

    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column' }}>
        <button className="back-link" onClick={onBack}>← Voltar</button>
        <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 14px' }}>{openChat.name}</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, marginBottom: 14 }}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.from === 'me' ? 'from-me' : 'from-them'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--color-border)', paddingTop: 10 }}>
          <input
            className="field-input"
            style={{ marginBottom: 0, borderRadius: 999 }}
            placeholder="Escrever mensagem..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button
            onClick={send}
            style={{ border: 'none', background: 'none', fontSize: 20, color: 'var(--color-accent)' }}
          >
            ➤
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1 className="screen-title">Mensagens</h1>
      {conversations.map((c) => (
        <button key={c.id} className="chat-row" onClick={() => onOpenChat(c)}>
          <div className="avatar">{c.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{c.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-muted)' }}>{c.last}</p>
          </div>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{c.time}</span>
        </button>
      ))}
    </div>
  )
}
