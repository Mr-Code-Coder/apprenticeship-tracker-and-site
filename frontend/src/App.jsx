import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)  // allows changing the state of count
  const [colour, setColour] = useState("red")
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://apprenticeship-backend.onrender.com/jobs')
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
      <h1>Apprenticeship Tracking Site</h1>

      <div style={{display: 'grid', gap: '20px'}}>
        {jobs.map((job) => (
          <div>
            <p>{job.title}</p>
            <p>{job.apply_date}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
