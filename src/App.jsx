import { useState } from 'react'
import './App.css'

function App() {
  // State management - these store your data
  const [boxA, setBoxA] = useState('')
  const [boxB, setBoxB] = useState('')
  const [result, setResult] = useState(null)

  // Supporting function - put all your logic here
  const handleAdd = () => {
    const numA = parseFloat(boxA)
    const numB = parseFloat(boxB)
    
    if (isNaN(numA) || isNaN(numB)) {
      setResult('Please enter valid numbers')
      return
    }
    
    setResult(numA + numB)
  }

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>This is my first website.</p>
      
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
