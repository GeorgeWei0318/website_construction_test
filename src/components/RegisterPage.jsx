import { useState } from 'react'
import '../styles/register.css'
import { saveUserRegistration } from '../utils/mockData'

function RegisterPage({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    department: '',
    position: '',
    image: '',
    bio: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.firstName.trim()) {
      setError('First name is required')
      return
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required')
      return
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const normalizedUser = {
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    }

    const newUser = saveUserRegistration(normalizedUser)
    setSuccess('Registration successful! Redirecting...')

    setTimeout(() => {
      onRegister(newUser)
    }, 1500)
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create Your Account</h1>
        <p className="subtitle">Join our professional network today</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 6 characters" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
            </div>

            <div className="form-group">
              <label htmlFor="image">Profile image URL</label>
              <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/avatar.jpg" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g., Google, Microsoft" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Engineering" />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} placeholder="Senior Developer" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Your introduction</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell people a little about your background, interests, and career goals..."
            />
          </div>

          <button type="submit" className="submit-button">Create Account</button>
        </form>

        <p className="note">
          Your information is saved locally in your browser, to be replaced with a real database.
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
