import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)  // allows changing the state of count
  const [colour, setColour] = useState("red")

  useEffect(() => {  // use effect triggers every render by default
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 
    5000); // 5 second delay
    
    return () => clearTimeout(timer)

  }, [] // Empty array here makes it so it only triggers after the first render
  )

  return ( // what html should fill the container
    <>
      <h1>Hello world</h1>

      
      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>

      <p>My Favourite colour is {colour}</p>

      <button onClick={() => setColour((colour) => "blue")}>
        Blue
      </button>
      <button onClick={() => setColour((colour) => "red")}>
        Red
      </button>
      <button onClick={() => setColour((colour) => "purple")}>
        Purple
      </button>

    </>
  )
}

export default App
