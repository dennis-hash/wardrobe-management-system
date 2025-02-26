<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
    <!-- Mobile Menu Button -->
    <div class="navbar-start flex items-center">
      <div class="dropdown">
        <button @click="isMenuOpen = !isMenuOpen" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
      </div>

      <!-- Logo -->
      <div class="border-none bg-white logo p-2 rounded-xl cursor-pointer" @click="navigateTo('/')">
        <img src="/logo/mm.png" alt="Logo" style="width: 80px;">
      </div>
    </div>


    <div class="hidden lg:flex w-full max-w-lg items-center gap-1 p-1 border border-gray-300 rounded focus-within:border-gray-400">
      <input type="text" class="grow text-sm p-1 focus:outline-none focus:border-none" placeholder="Search your wardrobe.." />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-5 w-5 opacity-70">
        <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
      </svg>
    </div>

    <div class="flex gap-3">
    <button @click="navigateTo('/add')" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Outfit</button>
    <button @click="navigateTo('/login')" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Category</button>
    </div>

    <div class="navbar-end pe-4 flex items-center">
      <div class="dropdown dropdown-end pe-4">
        <button tabindex="0" role="button">
          <svg aria-hidden="true" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
            <path fill-rule="evenodd" d="M12 3.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5M8.75 8a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0" clip-rule="evenodd"></path>
            <path d="M8 14.25A4.75 4.75 0 0 0 3.25 19v1a.75.75 0 0 0 1.5 0v-1A3.25 3.25 0 0 1 8 15.75h8A3.25 3.25 0 0 1 19.25 19v1a.75.75 0 0 0 1.5 0v-1A4.75 4.75 0 0 0 16 14.25H8"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>



  <!-- second nav bar -->
  <div class="hidden lg:flex items-center justify-between py-2 bg-slate-200">
    <!-- Left Side: Toggle Menu -->
<!--    <div class="flex items-center px-2">-->
<!--      <button @click="collapseSideMenu" class="flex items-center text-sm ">-->
<!--        <img-->
<!--          :src="isLeftSideBarCollapsed ? './icons/menu.svg' : './icons/x.svg'"-->
<!--          alt="Dashboard Icon"-->
<!--          class="w-5.5 h-5.5 mr-1">?-->
<!--        />-->
<!--        <span class="ml-1 px-1">All Items</span>-->
<!--      </button>-->
<!--    </div>-->

    <!-- Centered Menu Items -->
    <nav class="flex-1">
      <ul class="flex justify-center space-x-6 text-sm">
        <li v-for="item in menuItems" :key="item.text">
          <a :href="item.link" class="hover:text-gray-600 px-3">{{ item.text }}</a>
        </li>
      </ul>
    </nav>

    <!-- Placeholder for Right Side -->
    <div class="w-10"></div>
  </div>


</template>

