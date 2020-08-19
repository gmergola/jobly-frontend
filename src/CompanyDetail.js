import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';
import './CompanyDetail.css';

/**CompanyDetail: Shows a company's name, description, and jobs available */
function CompanyDetail() {
  const [company, setCompany] = useState({});
  let { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        let resp = await JoblyApi.getCompany(name);
        setCompany(resp);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCompany();
  }, [setCompany, name]);

  return (
    <div className="CompanyDetail-container">
      {isLoading ? <LoadingSpinner /> :
        <>
          <h3 className="CompanyDetail-title">{company.name}</h3>
          <div className="CompanyDetail-description"><b>{company.description}</b></div>
          <div>{company.jobs.map(job => (
            <JobCard
              key={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity} />
          ))}</div>
        </>}
    </div>
  );
}

export default CompanyDetail