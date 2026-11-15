import { useState } from 'react'
import '../styles/search.css'
import { createConnectionRequest, getConnectionStatus, mockPeople } from '../utils/mockData'

function SearchPage({ currentUser, onLogin }) {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [, setRequestVersion] = useState(0)

  const companies = [...new Set(mockPeople.map(p => p.company))]
  const departments = [...new Set(mockPeople.map(p => p.department))]
  const positions = [...new Set(mockPeople.map(p => p.position))]

  const filteredPeople = mockPeople.filter(person => {
    if (currentUser?.email.toLowerCase() === person.email.toLowerCase()) return false
    const companyMatch = !selectedCompany || person.company === selectedCompany
    const departmentMatch = !selectedDepartment || person.department === selectedDepartment
    const positionMatch = !selectedPosition || person.position === selectedPosition
    return companyMatch && departmentMatch && positionMatch
  })

  const handleReset = () => {
    setSelectedCompany('')
    setSelectedDepartment('')
    setSelectedPosition('')
  }

  return (
    <div className="search-page">
      <div className="filters-container">
        <div className="filter-group">
          <label>Company:</label>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Department:</label>
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Position:</label>
          <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
            <option value="">All Positions</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      <div className="results-info">
        <p>Found {filteredPeople.length} professional{filteredPeople.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="people-list">
        {filteredPeople.length > 0 ? (
          filteredPeople.map(person => (
            <div key={person.id} className="people-card">
              <div className="card-avatar">
                <img src={person.image} alt={`${person.firstName} ${person.lastName}`} />
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
                className="connect-btn"
                onClick={() => {
                  if (!currentUser) {
                    onLogin()
                    return
                  }
                  createConnectionRequest(currentUser, person)
                  setRequestVersion((version) => version + 1)
                }}
                disabled={currentUser && ['pending', 'accepted'].includes(getConnectionStatus(currentUser.email, person.email))}
                aria-label={`Connect with ${person.firstName} ${person.lastName}`}
              >
                {currentUser && getConnectionStatus(currentUser.email, person.email) === 'pending'
                  ? 'Sent!'
                  : currentUser && getConnectionStatus(currentUser.email, person.email) === 'accepted'
                    ? 'Connected'
                    : 'Connect'}
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">No professionals match your criteria</div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
