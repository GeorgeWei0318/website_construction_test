import '../styles/search.css'
import '../styles/network.css'
import { getChatsForUser } from '../utils/mockData'

function NetworkPage({ currentUser, onLogin, onOpenChat }) {
  if (!currentUser) {
    return (
      <section className="network-page">
        <div className="network-empty">
          <p>Log in to view your connections.</p>
          <button className="connect-btn" onClick={onLogin}>Log In</button>
        </div>
      </section>
    )
  }

  const contacts = getChatsForUser(currentUser.email).map((chat) =>
    chat.participants.find(
      (person) => person.email.toLowerCase() !== currentUser.email.toLowerCase()
    )
  ).filter(Boolean)

  return (
    <section className="network-page">
      <div className="results-info">
        <p>{contacts.length} connection{contacts.length !== 1 ? 's' : ''}</p>
      </div>

      {contacts.length > 0 ? (
        <div className="people-list">
          {contacts.map((person) => (
            <article className="people-card" key={person.email}>
              <div className="card-avatar">
                {person.image ? (
                  <img src={person.image} alt={`${person.firstName} ${person.lastName}`} />
                ) : (
                  <span>{person.firstName?.[0]}{person.lastName?.[0]}</span>
                )}
              </div>
              <div className="card-info">
                <div className="card-line title-line">
                  <h3>{person.firstName} {person.lastName}</h3>
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
                  <span>{person.phone || 'Not provided'}</span>
                </div>
              </div>
              <button
                className="connect-btn network-chat-button"
                onClick={() => onOpenChat(person.email)}
              >
                Chat
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-results">Accepted connections will appear here.</div>
      )}
    </section>
  )
}

export default NetworkPage
