import { useState } from 'react'
import '../styles/login.css'
import { authenticateUser } from '../utils/mockData'

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const user = authenticateUser(credentials.email, credentials.password)
    if (!user) {
      setError('Invalid email or password')
      return
    }

    onLogin(user)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Log In</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="login-email">Email *</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password *</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-submit-button">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
