import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://apprenticeship-backend.onrender.com/jobs') // query api
    .then(response => setJobs(response.data)) // then set jobs accordingly
    .catch(error => // if api is not running fill with temp data
      {console.log("Backend not detected, loading demo data...");
      setJobs([
        { id: 1, title: "Software Engineer Apprentice (Demo)", employer: "Google", location: "London", apply_date: "2026-12-01" },
        { id: 2, title: "Data Analyst Apprentice (Demo)", employer: "Sky", location: "Osterley", apply_date: "2026-11-15" }
      ]);
    });
  }, [])

  return ( // what html should fill the container
    <>
      <h1>Apprenticeship Tracking Site</h1>

      <div style={{display: 'grid', gap: '20px'}}>
        {jobs.map((job) => ( // for each job create this div element filled with its values
          <div className='display_block'>
            <h4>{job.title}</h4>
            <h5>{job.employer}</h5>
            <p>Apply date | Start Date</p>
            <p>{job.apply_date} | {job.start_date}</p>
            <a href={job.link} target='_blank'>Visit Vacancy</a>

          </div>
        ))}
      </div>
    </>
  )
}

export default App
