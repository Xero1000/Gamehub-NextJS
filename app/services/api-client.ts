import axios, { AxiosRequestConfig } from "axios";

// Structure of the response from API calls
export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

// Axios instance with default configuration.
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "5a00279a0cb347bcae546ecf4525c8a4",
  },
});

// Generic class for making API requests
class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Method to fetch all items from the API
  // Optional config object containing query parameters for filtering results
  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  // Method to fetch a single item with an id
  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
