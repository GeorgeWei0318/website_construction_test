import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import SearchPage from './components/SearchPage'
import MatchPage from './components/MatchPage'
import MainPage from './components/MainPage'
import MessagesPage from './components/MessagesPage'
import ChatPage from './components/ChatPage'
import NetworkPage from './components/NetworkPage'
import { getCurrentUser, setCurrentUser } from './utils/mockData'

function App() {
  const [currentPage, setCurrentPage] = useState('main') // main, search, match, network, messages, chat, register, login
  const [currentUser, setCurrentUserState] = useState(getCurrentUser())
  const [selectedChatEmail, setSelectedChatEmail] = useState('')

  const handleRegister = (userData) => {
    const profile = setCurrentUser(userData)
    setCurrentUserState(profile)
    setCurrentPage('main')
  }

  const handleLogout = () => {
    setCurrentUserState(null)
    localStorage.removeItem('currentUser')
    setCurrentPage('main')
  }

  const handleLogin = () => {
    setCurrentPage('login')
  }

  const handleRegisterPage = () => {
    setCurrentPage('register')
  }

  return (
    <div className={`app-container${currentPage === 'main' ? ' app-container--main' : ''}`}>
      {/* Top Navigation Bar */}
      <TopBar
        currentUser={currentUser}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onRegister={handleRegisterPage}
      />

      {/* Page Content */}
      <div className={`page-content${currentPage === 'login' || currentPage === 'register' ? ' auth-page-content' : ''}${currentPage === 'login' ? ' login-page-content' : ''}`}>
        {currentPage === 'main' && (
          <MainPage
            onSearch={() => setCurrentPage('search')}
            onMatch={() => setCurrentPage('match')}
          />
        )}
        {currentPage === 'search' && (
          <SearchPage
            currentUser={currentUser}
            onLogin={() => setCurrentPage('login')}
          />
        )}
        {currentPage === 'match' && (
          <MatchPage
            currentUser={currentUser}
            onLogin={() => setCurrentPage('login')}
          />
        )}
        {currentPage === 'messages' && (
          <MessagesPage currentUser={currentUser} onLogin={() => setCurrentPage('login')} />
        )}
        {currentPage === 'network' && (
          <NetworkPage
            currentUser={currentUser}
            onLogin={() => setCurrentPage('login')}
            onOpenChat={(email) => {
              setSelectedChatEmail(email)
              setCurrentPage('chat')
            }}
          />
        )}
        {currentPage === 'chat' && (
          <ChatPage
            currentUser={currentUser}
            onLogin={() => setCurrentPage('login')}
            initialContactEmail={selectedChatEmail}
          />
        )}
        {currentPage === 'register' && (
          <RegisterPage onRegister={handleRegister} />
        )}
        {currentPage === 'login' && (
          <LoginPage onLogin={handleRegister} />
        )}
      </div>
    </div>
  )
}

export default App
