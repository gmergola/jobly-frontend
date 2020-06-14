import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';

function CompanyDetail() {
  const [company, setCompany] = useState({});
  let { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // make api call to get a company
  // handle error if call went wrong
  // set isLoading state back to false
  useEffect(() => {
    console.log('use effect working');
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


  // If isLoading state is false render jobcard, otherwise show loading...
  if (isLoading) {

    return (<div>"Loading..."</div>);

  } else {
    return (
      <div>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        <div>{company.jobs.map(job => (
          <div>
            <JobCard
              key={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity} />
          </div>
        ))}</div>
      </div>
    );
  }
}

export default CompanyDetail