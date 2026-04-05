import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.employer.toLowerCase().includes(searchLower) ||
      job.title.toLowerCase().includes(searchLower)
    );
});

  useEffect(() => {
    axios.get('https://apprenticeship-backend.onrender.com/jobs') // query api
    .then(response => {
      setJobs(response.data);
      setLoading(false);}) // then set jobs accordingly
    .catch(error => // if api is not running fill with temp data
      {console.log("Backend not detected, loading demo data...");
      setJobs([
        { id: 1, title: "Software Engineer Apprentice (Demo)", employer: "Google", location: "London", apply_date: "2026-12-01" },
        { id: 2, title: "Data Analyst Apprentice (Demo)", employer: "Sky", location: "Osterley", apply_date: "2026-11-15" }
      ]);
      setLoading(false);
    });
  }, [])

  return ( // what html should fill the container
    <>
      <h1>Apprenticeship Tracking Site</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '4fr 1fr'}}>
      
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            width: '85%',
            borderRadius: '10px',
            border: '2px solid #2563eb',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>
          Showing {filteredJobs.length} of {jobs.length} opportunities
        </p>
        </div>

        <button style={{height: '2.5em'}} onClick={() => {
            setLoading(true)
            axios.get('https://apprenticeship-backend.onrender.com/scrape')
            .then(response => {
              setJobs(response.data)
              setLoading(false)
          })}}>Scrape Websites</button>

      </div>

      {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading webpage...</h2>
        <h2>Can take up to 30 seconds...</h2>
      </div>
      ) : (
      <div className='list'>
        {filteredJobs.map((job) => ( // for each job create this div element filled with its values
          <div className='display_block'>
            <h4>{job.title}</h4>
            <h5>{job.employer}</h5>
            <p>Apply date | Start Date</p>
            <p>{job.apply_date} | {job.start_date}</p>

            <a className='vacancy_button' href={job.link} target='_blank'>Visit Vacancy</a>

          </div>
        ))}
        </div>
        )}
    </>
  )
}

export default App
