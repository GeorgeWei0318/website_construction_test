import { useState, useEffect } from 'react'
import '../styles/match.css'
import { mockPeople } from '../utils/mockData'

function MatchPage({ currentUser }) {
  const [matches, setMatches] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const shuffled = [...mockPeople].sort(() => Math.random() - 0.5)
    setMatches(shuffled.slice(0, 5))
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % matches.length)
  }

  const handleConnect = () => {
    alert(`Connected with ${matches[currentIndex]?.firstName}!`)
  }

  if (matches.length === 0) {
    return <div className="match-page">Loading...</div>
  }

  const person = matches[currentIndex]
  const profileIntro = currentUser?.bio || 'I am a driven professional looking to connect with peers, grow through mentorship, and explore opportunities that match my ambition and skill set.'

  return (
    <div className="match-page">
      <div className="match-counter">
        Showing {currentIndex + 1} of {matches.length}
      </div>

      <div className="match-card">
        <div className="match-top-banner" />

        <div className="match-main-body">
          <div className="match-photo-panel">
            <img src={person.image} alt={`${person.firstName} ${person.lastName}`} />
          </div>

          <div className="match-info-panel">
            <div className="card-line title-line">
              <h2>{person.firstName} {person.lastName}</h2>
              <span className="company">{person.company}</span>
            </div>

            <div className="card-line secondary-line">
              <span>{person.department}</span>
              <span className="separator">•</span>
              <span>{person.position}</span>
            </div>

            <div className="card-line tertiary-line">
              <span>{person.email}</span>
              <span className="separator">•</span>
              <span>{person.phone || 'Phone unavailable'}</span>
            </div>

            <div className="summary-panel">
              <h3>About Me</h3>
              <p>{profileIntro}</p>
            </div>
          </div>
        </div>

        <div className="card-actions">
          <button className="action-btn next-btn" onClick={handleNext}>Next</button>
          <button className="action-btn connect-btn" onClick={handleConnect}>Connect</button>
        </div>
      </div>
    </div>
  )
}

export default MatchPage
