import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import './CompanyList.css'

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


  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }else{
    return (
      <div className="companies-container">
        <SearchBar whichSearch='companies' searchCompanies={companyListSearch}/>
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
}

export default CompanyList;
