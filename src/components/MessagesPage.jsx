import { useState } from 'react'
import '../styles/messages.css'
import { getIncomingConnectionRequests, respondToConnectionRequest } from '../utils/mockData'

function MessagesPage({ currentUser, onLogin }) {
  const [requests, setRequests] = useState(() =>
    currentUser ? getIncomingConnectionRequests(currentUser.email) : []
  )

  const handleResponse = (requestId, response) => {
    respondToConnectionRequest(requestId, response)
    setRequests(getIncomingConnectionRequests(currentUser.email))
  }

  if (!currentUser) {
    return (
      <section className="messages-page">
        <div className="messages-empty">
          <p>Log in to view your connection requests.</p>
          <button className="messages-primary-button" onClick={onLogin}>Log In</button>
        </div>
      </section>
    )
  }

  return (
    <section className="messages-page">
      {requests.length === 0 ? (
        <div className="messages-empty">You have no new connection requests.</div>
      ) : (
        <div className="message-request-list">
          {requests.map((request) => {
            const sender = request.fromProfile
            return (
              <article className="message-request-card" key={request.id}>
                <div className="message-request-avatar">
                  {sender.image ? (
                    <img src={sender.image} alt={`${sender.firstName} ${sender.lastName}`} />
                  ) : (
                    <span>{sender.firstName?.[0]}{sender.lastName?.[0]}</span>
                  )}
                </div>
                <div className="message-request-info">
                  <h2>{sender.firstName} {sender.lastName} wants to connect with you</h2>
                  <p>{sender.company} · {sender.position}</p>
                  <p>{sender.email}</p>
                </div>
                <div className="message-request-actions">
                  <button
                    className="messages-primary-button"
                    onClick={() => handleResponse(request.id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="messages-secondary-button"
                    onClick={() => handleResponse(request.id, 'declined')}
                  >
                    Decline
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default MessagesPage
