<script setup lang="ts">
import axiosInstance from "@/lib/axios.ts";
import {onMounted, ref} from "vue";
import { storeToRefs } from "pinia";
import type {User} from "@/types";
import {useAuthStore} from "@/store/auth.ts";
import {useDashboardStore} from "@/store/homeStore.ts";
import { useWardrobeStore } from "@/store/wardrobeStore";


const itemStore = useWardrobeStore();
const { categories } = storeToRefs(itemStore);

const auth = useAuthStore();
const dashboardStore = useDashboardStore();

const user = ref<User| null>(null);

onMounted(()=>{
  dashboardStore.fetchSummary();
  dashboardStore.fetchWardrobeItems();
  if(!auth.isLoggedIn){
    auth.getUser();
  }

})
</script>

<template>
    <div class="p-4 space-y-6">
      <!-- Summary Section -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Total Clothes</h5>
          <p class="text-gray-700 dark:text-gray-400">Total number of clothing items in your wardrobe.</p>
          <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded">
          {{ dashboardStore.summary.clothingCount}}
        </span>
        </div>

        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Favorites</h5>
          <p class="text-gray-700 dark:text-gray-400">Your most loved clothing pieces.</p>
          <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-green-500 rounded">
          {{ dashboardStore.summary.favoriteCount }}
        </span>
        </div>

        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h5>
          <p class="text-gray-700 dark:text-gray-400">Different categories of clothing available.</p>
          <span class="inline-block mt-2 px-4 py-2 text-lg font-bold text-white bg-purple-500 rounded">
          {{ dashboardStore.summary.categoryCount  }}
        </span>
        </div>
      </div>

      <h5 class="text-2xl font-bold text-gray-900 dark:text-white py-7">Wardrobe items</h5>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-1.5">
        <div
          v-for="item in dashboardStore.clothingList"
          :key="item.clothingId"
          class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h5 class="text-lg font-bold text-gray-900 dark:text-white">{{ item.name }}</h5>
          <p class="text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Color: {{ item.color }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Size: {{ item.size }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Type: {{ item.type }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Season: {{ item.season }}</p>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>
