<script setup lang="ts">
import axiosInstance from "@/lib/axios.ts";
import {onMounted, ref} from "vue";
import type {User} from "@/types";
import {useAuthStore} from "@/store/auth.ts";


const auth = useAuthStore();

const user = ref<User| null>(null);

onMounted(()=>{
  if(!auth.isLoggedIn){
    auth.getUser();
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">
    <!-- Clothing Count Card -->
    <a href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Clothes</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">Total number of clothing items in your wardrobe.</p>
      <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded">0</span>
    </a>

    <!-- Favorite Count Card -->
    <a href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Favorites</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">Your most loved clothing pieces.</p>
      <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-green-500 rounded">0</span>
    </a>

    <!-- Category Count Card -->
    <a href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Categories</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">Different categories of clothing available.</p>
      <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-purple-500 rounded">2</span>
    </a>
  </div>
</template>

<style scoped>

</style>
