import {defineStore} from "pinia";
import type {loginForm, RegisterForm, User} from "@/types";
import {reactive, ref} from "vue";
import axiosInstance from "@/lib/axios.ts";
import router from "@/router";
import {AxiosError} from "axios";
export const useAuthStore = defineStore("auth", ()=>{
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);

  const errors = reactive({
    name: [],
    email: [],
    password: [],

  });
  const register = async (payload: RegisterForm) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {baseURL: 'http://localhost:8000'});


    errors.name = [];
    errors.email = [];
    errors.password = [];
    console.log(payload)
    try {
      await axiosInstance.post('/register', payload);
       await getUser();
      await router.push('/dashboard');
    }catch (error){
      if( error instanceof AxiosError && error.response?.status === 422){
        errors.name = error.response.data.errors.name;
        errors.email = error.response.data.errors.email;
        errors.password = error.response.data.errors.password;
      }
    }
  };



  const errorsLogin = reactive({
    email: [],
    password: [],
  });

  const login = async (payload: loginForm) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {baseURL: 'http://localhost:8000'});

    errorsLogin.email = [];
    errorsLogin.password = [];

    try {
      console.log("Login success:",payload);
      await axiosInstance.post('/login', payload);
      await getUser();
      await router.push('/dashboard');
    }catch (error){
      if( error instanceof AxiosError && error.response?.status === 422){
        errorsLogin.email = error.response.data.errors.email;
        errorsLogin.password = error.response.data.errors.password;

      }
    }
  };

    const getUser = async () => {
      try {

        const response = await axiosInstance.get('/user');

       // console.log("User response:", response.data.message);
        user.value = response.data;
        isLoggedIn.value = true;

      } catch (error) {
        console.error("Error fetching user:", error);

      }
    };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout');
      user.value = null;
      isLoggedIn.value = false;
    }catch (error){
      console.log(error);
    }
  };

  return{
    user,
    isLoggedIn,
    errors,
    errorsLogin,
    register,
    login,
    getUser,
    logout,
  };

},
  {
    persist: {
      storage: sessionStorage,
      pick: ['user', 'isLoggedIn'],
    }
  }
    );
