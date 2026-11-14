import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import RegisterPage from './components/RegisterPage'
import SearchPage from './components/SearchPage'
import MatchPage from './components/MatchPage'
import MainPage from './components/MainPage'
import { getCurrentUser, setCurrentUser } from './utils/mockData'

function App() {
  const [currentPage, setCurrentPage] = useState('main') // main, search, match, register
  const [currentUser, setCurrentUserState] = useState(getCurrentUser())

  const handleRegister = (userData) => {
    // Save user data
    setCurrentUser(userData)
    setCurrentUserState(userData)
    setCurrentPage('main')
  }

  const handleLogout = () => {
    setCurrentUserState(null)
    localStorage.removeItem('currentUser')
    setCurrentPage('main')
  }

  const handleLoginRegister = () => {
    setCurrentPage('register')
  }

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <TopBar
        currentUser={currentUser}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        onLoginRegister={handleLoginRegister}
      />

      {/* Page Content */}
      <div className="page-content">
        {currentPage === 'main' && (
          <MainPage
            onSearch={() => setCurrentPage('search')}
            onMatch={() => setCurrentPage('match')}
          />
        )}
        {currentPage === 'search' && (
          <SearchPage />
        )}
        {currentPage === 'match' && (
          <MatchPage currentUser={currentUser} />
        )}
        {currentPage === 'register' && (
          <RegisterPage onRegister={handleRegister} />
        )}
      </div>
    </div>
  )
}

export default App
