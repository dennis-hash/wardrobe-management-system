<script setup lang="ts">
import axiosInstance from "@/lib/axios.ts";
import {reactive} from "vue";
import {AxiosError} from "axios";
import type {RegisterForm} from "@/types";
import {useAuthStore} from "@/store/auth.ts";
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

const navigateTo = (path: string) => {
  router.push(path);
};

const form = reactive<RegisterForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});





</script>

<template>


  <div class="flex h-screen">
    <div class="hidden lg:flex w-1/4 bg-cover bg-center relative" :style="{ backgroundImage: 'url(./images/ss.png)' }">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute top-6 left-6">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Wardrobe
        </h1>
      </div>
      <div class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold text-center p-4">
        Manage Your Wardrobe with Ease
      </div>
    </div>

    <div class="w-full lg:w-3/4 flex justify-center items-center p-6">
      <div class="max-w-md w-full">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-6">
          Create an Account
        </h2>
        <form class="space-y-5" @submit.prevent="auth.register(form)">
          <div class="py-2">
            <label for="name" class="block text-sm font-medium text-gray-700 py-1.5">Your Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full p-2.5 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <template v-if="auth.errors.name?.length">
           <span v-for="error in auth.errors.name" :key="error" class="text-red-500 text-sm">
              {{ error }}
            </span>
          </template>

          <div class="py-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full p-2.5 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
              required
            />
          </div>
          <template v-if="auth.errors.email?.length">
             <span v-for="error in auth.errors.email" :key="error" class="text-red-500 text-sm">
              {{ error }}
            </span>
          </template>
          <div class="py-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Your Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="w-full p-2.5 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <template v-if="auth.errors.password?.length">
            <span v-for="error in auth.errors.password" :key="error" class="text-red-500 text-sm">
              {{ error }}
            </span>
          </template>
          <div class="py-2">
            <label for="repeat-password" class="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type="password"
              id="repeat-password"
              v-model="form.password_confirmation"
              class="w-full p-2.5 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full text-white mt-3 bg-gradient-to-r from-purple-500 to-indigo-500  font-medium rounded-lg px-2 py-3 focus:outline-none "
          >
            <span v-if="auth.loadingReg">
                Loading ...
            </span>
            <span v-else>Sign up</span>
          </button>
          <p class="text-sm text-gray-600 text-center mt-4">
            Already have an account? <a @click="navigateTo('/login')" class="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>



  </div>


</template>

<style scoped>

</style>
