import { useState } from 'react'
import './App.css'

function App() {
  // Calculator states
  const [boxA, setBoxA] = useState('')
  const [boxB, setBoxB] = useState('')
  const [result, setResult] = useState(null)

  // Suggestion box states
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestionText, setSuggestionText] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  // Supporting function - calculator logic
  const handleAdd = () => {
    const numA = parseFloat(boxA)
    const numB = parseFloat(boxB)
    
    if (isNaN(numA) || isNaN(numB)) {
      setResult('Please enter valid numbers')
      return
    }
    
    setResult(numA + numB)
  }

  // Supporting function - save suggestion to localStorage
  const saveSuggestion = () => {
    if (!suggestionText.trim()) {
      setSaveMessage('Please enter a suggestion!')
      return
    }

    // Get existing suggestions from localStorage
    const existingSuggestions = JSON.parse(localStorage.getItem('suggestions') || '[]')
    
    // Add new suggestion with timestamp
    const newSuggestion = {
      text: suggestionText,
      timestamp: new Date().toLocaleString()
    }
    existingSuggestions.push(newSuggestion)
    
    // Save back to localStorage
    localStorage.setItem('suggestions', JSON.stringify(existingSuggestions))
    
    // Reset and show success message
    setSuggestionText('')
    setSaveMessage('Suggestion saved! ✓')
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>This is my first website.</p>
      
      {/* Suggestion Box - Top Right Corner */}
      <div className="suggestion-box-corner">
        <button 
          className="suggestion-button"
          onClick={() => setShowSuggestion(!showSuggestion)}
        >
          💡 Suggestions
        </button>

        {showSuggestion && (
          <div className="suggestion-panel">
            <h3>Send us feedback!</h3>
            <textarea
              value={suggestionText}
              onChange={(e) => setSuggestionText(e.target.value)}
              placeholder="Share your ideas or report issues..."
            />
            <button 
              className="suggestion-save-btn"
              onClick={saveSuggestion}
            >
              Save Suggestion
            </button>
            {saveMessage && (
              <div className="suggestion-message">{saveMessage}</div>
            )}
          </div>
        )}
      </div>
      
      {/* Input boxes */}
      <div className="calculator-section">
        <label>
          Box A:
          <input 
            type="number" 
            value={boxA}
            onChange={(e) => setBoxA(e.target.value)}
            placeholder="Enter number"
          />
        </label>
        
        <label>
          Box B:
          <input 
            type="number" 
            value={boxB}
            onChange={(e) => setBoxB(e.target.value)}
            placeholder="Enter number"
          />
        </label>
        
        <button onClick={handleAdd}>Add</button>
      </div>
      
      {/* Result box */}
      {result !== null && (
        <div className="result-box">
          <strong>Result: {result}</strong>
        </div>
      )}
    </div>
  )
}

export default App
