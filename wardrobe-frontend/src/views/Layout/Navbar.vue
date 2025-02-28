<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from "@/store/auth.ts";

const auth = useAuthStore();

const router = useRouter();
const isMenuOpen = ref(false);

const navigateTo = (path: string) => {
  router.push(path);
};

const isLeftSideBarCollapsed = ref(true);

const collapseSideMenu = () => {
  isLeftSideBarCollapsed.value = !isLeftSideBarCollapsed.value;
};

const menuItems = ref([
  { text: "New Arrivals", link: "/" },
  { text: "Men's Catalog", link: "/" },
  { text: "Women's Catalog", link: "/" },
  { text: "Apparel", link: "/" },
  { text: "Accessories", link: "/" },
  { text: "Sale", link: "/" },
  { text: "Brands", link: "/" }
]);
</script>

<template>
  <nav class="navbar bg-base-100 px-4 py-2 flex justify-between items-center">

    <div class="navbar-start flex items-center">
      <div class="dropdown">
        <button @click="isMenuOpen = !isMenuOpen" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
      </div>


      <div class="border-none bg-white logo p-2 rounded-xl cursor-pointer" @click="navigateTo('/dashboard')">
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Wardrobe
        </h1>
      </div>
    </div>


    <div class="hidden lg:flex w-full max-w-lg items-center gap-1 p-1 border border-gray-300 rounded focus-within:border-gray-400">
      <input type="text" class="grow text-sm p-1 focus:outline-none focus:border-none" placeholder="Search your wardrobe.." />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-5 w-5 opacity-70">
        <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
      </svg>
    </div>

    <div class="flex gap-3">
    <button @click="navigateTo('/outfits')" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Manage Outfits</button>
    <button @click="navigateTo('/categories')" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Manage Categories</button>
    </div>

    <div class="navbar-end pe-4 flex items-center">
      <div class="relative">
        <!-- Toggle button -->
        <button id="dropdownButton" class="peer">
          <svg aria-hidden="true" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-white">
            <path fill-rule="evenodd" d="M12 3.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5M8.75 8a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0" clip-rule="evenodd"></path>
            <path d="M8 14.25A4.75 4.75 0 0 0 3.25 19v1a.75.75 0 0 0 1.5 0v-1A3.25 3.25 0 0 1 8 15.75h8A3.25 3.25 0 0 1 19.25 19v1a.75.75 0 0 0 1.5 0v-1A4.75 4.75 0 0 0 16 14.25H8"></path>
          </svg>
        </button>

        <!-- Dropdown content -->
        <div class="absolute right-0 mt-2 hidden w-52 bg-white border border-gray-200 rounded-lg shadow-lg peer-focus:block">
          <div class="px-4 py-3">
            <p class="text-sm font-semibold text-gray-900">{{auth.user?.name}}</p>
            <p class="text-sm text-gray-500">{{auth.user?.email}}</p>
          </div>
          <div class="border-t border-gray-200"></div>
          <button  @click="auth.logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
        </div>
      </div>
    </div>




  </nav>




  <div class="hidden lg:flex items-center justify-between py-2 bg-slate-200">
    <nav class="flex-1">
      <ul class="flex justify-center space-x-6 text-sm">
        <li v-for="item in menuItems" :key="item.text">
          <a :href="item.link" class="hover:text-gray-600 px-3">{{ item.text }}</a>
        </li>
      </ul>
    </nav>


    <div class="w-10"></div>
  </div>


</template>

