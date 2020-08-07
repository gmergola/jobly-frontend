import axios from "axios";

/**JoblyApi: a class of instance methods that make axios requests */
class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    let currentToken = localStorage.getItem("token");
    paramsOrData._token = currentToken;

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        // url: `https://genna-k-jobly-backend.herokuapp.com/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /*getCompany: gets company by handle from backend API*/
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /*getAllCompanies: gets all companies from backend API*/
  static async getAllCompanies() {
    let res = await this.request('companies/');
    return res.companies;
  }

  /*getAllJobs: gets all jobs from backend API*/
  static async getAllJobs() {
    let res = await this.request('jobs/');
    return res.jobs;
  }

  /**getFilteredCompanies: get's companies based on query string from search */
  static async getFilteredCompanies(params) {
    let res = await this.request('companies/', params);
    return res.companies;
  }

  /**getFilteredJobs: get's jobs based on query string from search */
  static async getFilteredJobs(params) {
    let res = await this.request('jobs/', params);
    return res.jobs;
  }
  /**updateUser: edits the current user
   * jsonData -> {username: '', password: ''}
    */
  static async login(data) {
    let res = await this.request('login/', data, "post");
    return res.token;
  }
  /**updateUser: edits the current user
   * jsonData -> {username: '', password: '', first_name: '', last_name: '', email: ''}
   */
  static async signup(data) {
    let res = await this.request('users/', data, "post");
    return res.token;
  }

  /**getCurrentUser: gets the current signed in user */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**updateUser: edits the current user
   * jsonData -> {first_name: '', last_name: '', email: '', photo_url: '', username: '', password: ''}
   */
  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}


export default JoblyApi;


