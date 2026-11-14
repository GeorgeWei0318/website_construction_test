import '../styles/mainpage.css'

function MainPage({ onSearch, onMatch }) {
  return (
    <div className="main-page">
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
  )
}

export default MainPage
