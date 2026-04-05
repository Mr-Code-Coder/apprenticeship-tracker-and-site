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

  const handleOnMouseMoveOverCard = (e) => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

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
      <header>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1em 1em'}}>
          <h3 style={{flexGrow: '1'}}>Apprenticeship Tracking Site</h3>

          <div style={{ textAlign: 'center', flexGrow: '6' }}>
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
          </div>

          <button style={{height: '2.5em', flexGrow: '2'}} onClick={() => {
              setLoading(true)
              axios.get('https://apprenticeship-backend.onrender.com/scrape')
              .then(response => {
                setJobs(response.data)
                setLoading(false)
            })}}>Scrape Websites</button>

        </div>
      
      <p style={{ marginTop: '10px', color: '#666'}}>
            Showing {filteredJobs.length} of {jobs.length} opportunities
          </p>

      </header>

      {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading webpage...</h2>
        <h2>Can take up to 30 seconds...</h2>
      </div>
      ) : (
      <div id='list'>
        {filteredJobs.map((job) => ( // for each job create this div element filled with its values
          <div key={job.id} className='card' onMouseMove={handleOnMouseMoveOverCard}>
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
