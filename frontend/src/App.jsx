import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)  // allows changing the state of count
  const [colour, setColour] = useState("red")
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/jobs')
    .then(response => setJobs(response.data))
    .catch(error => 
      {console.log("Backend not detected, loading demo data...");
      setJobs([
        { id: 1, title: "Software Engineer Apprentice (Demo)", employer: "Google", location: "London", apply_date: "2026-12-01" },
        { id: 2, title: "Data Analyst Apprentice (Demo)", employer: "Sky", location: "Osterley", apply_date: "2026-11-15" }
      ]);
    });
  }, [])

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

      <div style={{display: 'grid', gap: '20px'}}>
        {jobs.map((job) => (
          <h1>{job.title}</h1>
        ))}
      </div>


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
