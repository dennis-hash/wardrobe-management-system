import axios from 'axios';
import {useAuthStore} from "@/store/auth.ts";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: "https://wardrobe-management-system.onrender.com/api",
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  headers: {

    Accept: "application/json",

  },
});



export default axiosInstance;

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const auth = useAuthStore();
    switch (error.response?.status) {
      case 401:
        router.push('/login');
        break;

        case 419:
          await router.push('/login');
          break;

          case 422:
            if (error.response.data.message === 'Unauthenticated.') {
              auth.logout();
              router.push('/login');
            }
            break;
    }

  },
);
