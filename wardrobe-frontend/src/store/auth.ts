import {defineStore} from "pinia";
import type {loginForm, RegisterForm, User} from "@/types";
import {reactive, ref} from "vue";
import axiosInstance from "@/lib/axios.ts";
import router from "@/router";
import {AxiosError} from "axios";
export const useAuthStore = defineStore("auth", ()=>{
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const loadingLogin = ref(false);
    const loadingReg = ref(false);

  const errors = reactive({
    name: [],
    email: [],
    password: [],

  });
  const register = async (payload: RegisterForm) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {baseURL: 'https://wardrobe-management-system.onrender.com'});


    errors.name = [];
    errors.email = [];
    errors.password = [];
    console.log(payload)
    try {
      loadingReg.value = true;
      await axiosInstance.post('/register', payload);
      await getUser();
      await router.push('/dashboard');
    }catch (error){
      if( error instanceof AxiosError && error.response?.status === 422){
        errors.name = error.response.data.errors.name;
        errors.email = error.response.data.errors.email;
        errors.password = error.response.data.errors.password;
      }
    }finally {
      loadingReg.value = false;
    }
  };



  const errorsLogin = reactive({
    email: [],
    password: [],
  });

  const login = async (payload: loginForm) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {baseURL: 'https://wardrobe-management-system.onrender.com'});

    errorsLogin.email = [];
    errorsLogin.password = [];

    try {
      //console.log("Login success:",payload);
      loadingLogin.value = true;
      const response = await axiosInstance.post('/login', payload);
      console.log("Login response:", response.status);
      await getUser();
      await router.push('/dashboard');
    }catch (error){
      console.log("Login error:", error);
      if( error instanceof AxiosError && error.response?.status === 422){
        errorsLogin.email = error.response.data.errors.email;
        errorsLogin.password = error.response.data.errors.password;

      }
    }finally {
      loadingLogin.value = false;
    }
  };

    const getUser = async () => {
      try {
        const response = await axiosInstance.get('/user');
       console.log("User response:", response.status);
       user.value = response.data;
       isLoggedIn.value = true;

      } catch (error) {
        console.error("Error fetching user:", error);

      }
    };

  const logout = async () => {
    try {
      console.log("loggin out..")
      await axiosInstance.post('/logout');
      user.value = null;
      isLoggedIn.value = false;
    }catch (error){
      console.log(error);
    }
  };

  return{
    loadingLogin,
    loadingReg,
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
