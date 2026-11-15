import { useState } from 'react'
import '../styles/chat.css'
import { getChatsForUser, sendChatMessage } from '../utils/mockData'

function ChatPage({ currentUser, onLogin, initialContactEmail }) {
  const [chats, setChats] = useState(() =>
    currentUser ? getChatsForUser(currentUser.email) : []
  )
  const [selectedChatId, setSelectedChatId] = useState(() => {
    const initialChat = chats.find((chat) =>
      chat.participantEmails.some(
        (email) => email.toLowerCase() === initialContactEmail?.toLowerCase()
      )
    )
    return initialChat?.id || chats[0]?.id || ''
  })
  const [draft, setDraft] = useState('')

  if (!currentUser) {
    return (
      <section className="chat-page">
        <div className="chat-empty">
          <p>Log in to view your conversations.</p>
          <button className="chat-send-button" onClick={onLogin}>Log In</button>
        </div>
      </section>
    )
  }

  const selectedChat = chats.find((chat) => chat.id === selectedChatId)
  const contact = selectedChat?.participants.find(
    (person) => person.email.toLowerCase() !== currentUser.email.toLowerCase()
  )

  const handleSend = (event) => {
    event.preventDefault()
    if (!selectedChat || !draft.trim()) return

    sendChatMessage(selectedChat.id, currentUser.email, draft)
    setChats(getChatsForUser(currentUser.email))
    setDraft('')
  }

  return (
    <section className="chat-page">
      <div className="chat-layout">
        <aside className="chat-contact-list" aria-label="Connections">
          {chats.length === 0 ? (
            <p className="chat-no-contacts">Accepted connections will appear here.</p>
          ) : (
            chats.map((chat) => {
              const person = chat.participants.find(
                (participant) => participant.email.toLowerCase() !== currentUser.email.toLowerCase()
              )
              return (
                <button
                  className={`chat-contact${chat.id === selectedChatId ? ' is-selected' : ''}`}
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  {person?.image ? (
                    <img src={person.image} alt="" />
                  ) : (
                    <span className="chat-contact-initials">{person?.firstName?.[0]}</span>
                  )}
                  <span>{person?.firstName} {person?.lastName}</span>
                </button>
              )
            })
          )}
        </aside>

        <div className="chat-conversation">
          {selectedChat && contact ? (
            <>
              <header className="chat-conversation-header">
                <strong>{contact.firstName} {contact.lastName}</strong>
                <span>{contact.company}</span>
              </header>
              <div className="chat-message-list" aria-live="polite">
                {selectedChat.messages.length === 0 ? (
                  <p className="chat-start-prompt">You are connected. Send a message to start chatting.</p>
                ) : (
                  selectedChat.messages.map((message) => (
                    <div
                      className={`chat-message${message.senderEmail === currentUser.email.toLowerCase() ? ' is-own-message' : ''}`}
                      key={message.id}
                    >
                      <p>{message.text}</p>
                      <time dateTime={message.createdAt}>
                        {new Date(message.createdAt).toLocaleString()}
                      </time>
                    </div>
                  ))
                )}
              </div>
              <form className="chat-compose" onSubmit={handleSend}>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a message..."
                  aria-label="Write a message"
                />
                <button className="chat-send-button" type="submit" disabled={!draft.trim()}>
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty-conversation">
              Accept a connection request to start a conversation.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ChatPage
