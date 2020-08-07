import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import LoadingSpinner from './LoadingSpinner';
import './JobList.css';
import j from './images/j.jpg';

/**JobList: Component that renders list of JobCards */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inital request to get all jobs
  useEffect(() => {
    async function getJobs() {
      try {
        let resp = await JoblyApi.getAllJobs()
        setJobs(resp);
      } catch (err) {
        console.error(err);
      }finally {
        setIsLoading(false);
      }
    }
    getJobs();
  }, [setJobs]);

  //runs on search bar if search bar is used, passed to search bar component in props
  function jobListSearch(filteredJobs) {
    setJobs(filteredJobs);
  }

  return (
    isLoading ? <LoadingSpinner /> :
    <div className="jobs-container">
      <SearchBar whichSearch='jobs' searchJobs={jobListSearch} />
      <img className="JobList-j" src={j} alt="j"/>
      <div className="JobList-card">
        {jobs.map(({ title, salary, equity, id }) =>
          <JobCard
            key={id}
            title={title}
            salary={salary}
            equity={equity}
          />)}
      </div>

    </div>
  );
}


export default JobList;