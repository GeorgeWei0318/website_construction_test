import '../styles/mainpage.css'

function MainPage({ onSearch, onMatch }) {
  return (
    <div className="main-page">
      <div className="main-page-content">
        <div className="main-buttons-container">
          <button className="main-button search-button" onClick={onSearch}>
            <span className="button-content">
              <span className="button-title">SEARCH</span>
              <span className="button-subtitle">exploring your new job by directly search inside the company!</span>
            </span>
          </button>

          <button className="main-button match-button" onClick={onMatch}>
            <span className="button-content">
              <span className="button-title">MATCH</span>
              <span className="button-subtitle">Discover connections</span>
            </span>
          </button>
        </div>
      </div>
      <footer className="main-footer">
        <div className="main-footer-links">
          <h2>LookitIn</h2>
          <span>About</span>
          <span>Leadership</span>
          <span>Careers</span>
        </div>
        <div className="main-footer-bottom">
          <p>© 2026 LookitIn Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainPage
