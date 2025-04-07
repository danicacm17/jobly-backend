import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** JoblyApi Class.
 *
 * A centralized helper for interacting with the Jobly backend API.
 * All API routes are wrapped here for clean, reusable access.
 * Token-based authorization is supported through a static `token` property.
 */

class JoblyApi {
  // Static token property (set this after login/signup)
  static token;

  /** Generic request method for all API calls.
   *
   * @param {string} endpoint - The API endpoint
   * @param {object} data - Payload or query params
   * @param {string} method - HTTP method (get, post, patch, etc.)
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ------------------------------------------------------------
  // Company-related API routes

  /** Get a list of all companies (optionally filter by name). */
  static async getCompanies(name) {
    const res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a specific company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // ------------------------------------------------------------
  // Job-related API routes

  /** Get a list of all jobs (optionally filter by title). */
  static async getJobs(title) {
    const res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a specific job for a given user. */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  // ------------------------------------------------------------
  // Auth-related API routes

  /** Login user, return auth token. */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Register new user, return auth token. */
  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // ------------------------------------------------------------
  // User-related API routes

  /** Get current user by username. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update current user profile data. */
  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

// Temporary hardcoded token for "testuser" (used during early dev)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
