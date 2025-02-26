<script setup lang="ts">
import axiosInstance from "@/lib/axios.ts";
import {reactive} from "vue";
import {useAuthStore} from "@/store/auth.ts";
import type {loginForm} from "@/types";

const auth = useAuthStore();

const form = reactive<loginForm>({
  email: "",
  password: "",
});




</script>

<template>
  <div class="flex h-screen">

    <div class="hidden lg:flex w-1/4 bg-cover bg-center relative" :style="{ backgroundImage: 'url(./images/ss.png)' }">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute top-6 left-6">
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Wardrobe
        </h1>
      </div>
      <div class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold text-center p-4">
        Your Wardrobe, Your Style
      </div>
    </div>


    <div class="w-full lg:w-3/4 flex justify-center items-center p-6">
      <div class="max-w-md w-full">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
          Welcome Back! Login
        </h2>
        <form class="space-y-5" @submit.prevent="auth.login(form)">
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
          <template v-if="auth.errors.email.length > 0">
            <p class="text-red-500 text-sm" v-for="error in auth.errorsLogin.email" :key="error">{{ error }}</p>
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
          <template v-if="auth.errors.password.length > 0">
            <p class="text-red-500 text-sm" v-for="error in auth.errorsLogin.password" :key="error">{{ error }}</p>
          </template>
          <div class="flex justify-between items-center">
            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            class="w-full text-white mt-3 bg-gradient-to-r from-purple-500 to-indigo-500  font-medium rounded-lg px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
          <p class="text-sm text-gray-600 text-center mt-4">
            Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>


  </div>
</template>


<style scoped>

</style>
