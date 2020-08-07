import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from './LoadingSpinner';
import './CompanyList.css';
import j from './images/j.jpg';

/**CompanyList: Component that renders list of CompanyCards */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      try {
        let resp = await JoblyApi.getAllCompanies();
        setCompanies(resp);
      } catch (err) {
        console.error('server failed', err);
      }finally{
        setIsLoading(false);
      }
    }
    getCompanies();

  }, [setCompanies]);


  function companyListSearch(filteredCompanies){
    setCompanies(filteredCompanies);
  }

  return (
    isLoading ? <LoadingSpinner /> :
    <div className="companies-container">
      <SearchBar whichSearch='companies' searchCompanies={companyListSearch}/>
      <img className="CompanyList-j" src={j} alt="j"/>
      <div className="CompanyList-card">
        {companies.map(({ name, logo_url, description, handle }) =>
          <CompanyCard
            key={handle}
            handle={handle}
            name={name}
            logoUrl={logo_url}
            description={description}
          />)}
      </div>
    </div>
  )
}

export default CompanyList;
