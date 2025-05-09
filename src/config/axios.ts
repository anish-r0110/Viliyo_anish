import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

type Mode = 'api' | 'local';


//  Change the mode of application from getting data from API Endpoint or it should be local
export const mode:Mode = "api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://vttapi.atwpl.com/api/v1", // Replace with your API base URL
  timeout: 100000, // Set the timeout value as per your requirements
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // Add any request headers or perform any modifications here
    const token = localStorage.getItem('token');
    if (config.method == "get") {
      config.data = { ...config.data };
      config.headers["Content-Type"] = "application/json";
    }

    if (config.method == "post") {
      config.data = { ...config.data, app: "Viliyo-Application" };
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
 
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Handle successful responses
    return response.data;
  },
  (error: AxiosError<{ message: string }>) => {
    // Handle response errors
    if( error?.response?.status === 401 ){
       window.location.replace('/login');
       return Promise.reject('Unauthorized Access');
    }

    toast.error( error.message || 'Something went wrong');

    return Promise.reject(error);
  }
);

export default axiosInstance;
