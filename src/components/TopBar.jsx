import '../styles/topbar.css'

function TopBar({ currentUser, onNavigate, onLogout, onLoginRegister }) {
  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`
    : 'LI'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo">LookitIn</div>

        <nav className="topbar-nav" aria-label="Main navigation">
          <button className="nav-item is-active" onClick={() => onNavigate('main')}>
            Home
          </button>
          <button className="nav-item" onClick={() => onNavigate('main')}>
            Network
          </button>
          <button className="nav-item" onClick={() => onNavigate('main')}>
            Jobs
          </button>
          <button className="nav-item" onClick={() => onNavigate('main')}>
            Chat
          </button>
        </nav>
      </div>

      <div className="topbar-search">
        <input type="text" className="search-box" placeholder="What do you want to learn?" />
        <button className="search-icon-btn" aria-label="Search">
          ⌕
        </button>
      </div>

      <div className="topbar-right">
        {currentUser ? (
          <>
            <div className="user-info">
              {currentUser.image ? (
                <img className="user-avatar user-avatar-image" src={currentUser.image} alt="User avatar" />
              ) : (
                <span className="user-avatar">{initials}</span>
              )}
              <span className="user-name">{currentUser.firstName} {currentUser.lastName}</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={onLoginRegister}>Log In</button>
            <button className="join-btn" onClick={onLoginRegister}>Join for Free</button>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar
