import axios from 'axios';

// Set up the base URL based on the environment
// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_PUBLIC_REMOTE_CLIENT_API
//     : process.env.NEXT_PUBLIC_LOCAL_CLIENT_API;
const baseURL = "http://localhost:8000";
// Create a reusable axios instance configuration function
const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true, 
  });
};



const instance = createAxiosInstance(baseURL);

// Function to set authentication token in the Axios headers
export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

// Function to perform login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
  
};

// Function to perform logout
export const logoutUser = async () => {
    try {
      const response = await instance.get('/api/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
    
  };


export default instance;