const items = [
  { key: 'home', label: 'Serviços', icon: '🏠' },
  { key: 'business', label: 'Empresas', icon: '🏢' },
  { key: 'create', label: 'Prestar', icon: '➕' },
  { key: 'indicaplus', label: 'INDICA+', icon: '🎯' },
  { key: 'profile', label: 'Perfil', icon: '👤' }
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.key}
          className={`nav-item ${active === item.key ? 'active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          <span className="nav-item__icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
