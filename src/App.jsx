import { useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import Home from './components/Home.jsx'
import ServiceDetail from './components/ServiceDetail.jsx'
import CreateListing from './components/CreateListing.jsx'
import Messages from './components/Messages.jsx'
import Profile from './components/Profile.jsx'
import BusinessLeads from './components/BusinessLeads.jsx'
import IndicaPlus from './components/IndicaPlus.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  const [selectedService, setSelectedService] = useState(null)
  const [openChat, setOpenChat] = useState(null)
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (id) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }

  const goToTab = (key) => {
    setSelectedService(null)
    setOpenChat(null)
    setTab(key)
  }

  const openService = (service) => {
    setSelectedService(service)
  }

  const contactProvider = (service) => {
    setOpenChat({ name: service.title })
    setTab('messages')
  }

  let content

  if (selectedService) {
    content = (
      <ServiceDetail
        service={selectedService}
        onBack={() => setSelectedService(null)}
        onContact={contactProvider}
      />
    )
  } else if (tab === 'home') {
    content = (
      <Home
        onOpenService={openService}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpenMessages={() => setTab('messages')}
      />
    )
  } else if (tab === 'business') {
    content = <BusinessLeads />
  } else if (tab === 'create') {
    content = <CreateListing />
  } else if (tab === 'indicaplus') {
    content = <IndicaPlus />
  } else if (tab === 'messages') {
    content = (
      <Messages
        openChat={openChat}
        onOpenChat={setOpenChat}
        onBack={openChat ? () => setOpenChat(null) : () => setTab('home')}
      />
    )
  } else if (tab === 'profile') {
    content = (
      <Profile
        favoritesCount={favorites.length}
        onViewFavorites={() => goToTab('home')}
      />
    )
  }

  return (
    <div className="app-shell">
      {content}
      <BottomNav active={tab} onChange={goToTab} />
    </div>
  )
}
