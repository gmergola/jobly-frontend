import React, { useState, useEffect, useCallback } from 'react';
import JoblyApi from "./HelperApi";
import './SearchBar.css';



/**SearchBar: Component that is used to filter a list */
function SearchBar({ searchCompanies, searchJobs, whichSearch }) {
  const [formData, setFormData] = useState('');
  const [searchClick, setSearchClick] = useState(false);

  // handleChange: sets formData state to form values
  function handleChange(evt) {
    let { name, value } = evt.target
    setFormData({ [name]: value });
  }

  // handleSubmit: changes our useEffect state to true ot false
  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchClick(!searchClick);

  }

  /*filteredSearch: once search is submitted, useEffect uses API filteredCompanies
  or filteredJobs method then passes
  reponse to search function to change state in company list or job list
  to filter lists shown*/
  const filterSearch = useCallback(
    async (formData) => {
      try {
        if (whichSearch === 'companies') {
          let response = await JoblyApi.getFilteredCompanies(formData);
          searchCompanies(response);

        } else {
          let response = await JoblyApi.getFilteredJobs(formData);
          searchJobs(response);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSearchClick(false);
      }

    }, [searchCompanies, searchJobs, whichSearch]);

  useEffect(() => {
    if (searchClick) {
      filterSearch(formData);
    }

  }, [searchClick, filterSearch, formData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div className="input-group">
          <input
          className="search-input form-control"
          onChange={handleChange}
          name="search"
          placeholder={whichSearch === 'companies' ? "Search Companies" : "Search Jobs"}
          />
          <button className="search-btn btn btn-success" type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;