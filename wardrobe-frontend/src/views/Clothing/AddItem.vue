<script setup lang="ts">
import { useWardrobeStore } from "@/store/wardrobeStore";
import { storeToRefs } from "pinia";

const store = useWardrobeStore();
const { form, errors, categories } = storeToRefs(store);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    form.value.image = input.files[0];
  }
};
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-white border border-gray-300 shadow-lg p-8 rounded-md w-3/4 lg:w-3/4">
  <form
    @submit.prevent="store.submitForm"

  >
    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <input
        v-model="form.name"
        type="text"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-50"
      />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea
        v-model="form.description"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description[0] }}</p>
    </div>

    <div class="mb-7 py-2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
      <input
        type="file"
        @change="handleFileChange"
        class="w-full text-sm border rounded-lg cursor-pointer"
      />
      <p v-if="errors.image" class="text-red-500 text-sm">{{ errors.image[0] }}</p>

    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Type</label>
      <input
        v-model="form.type"
        type="text"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Category</label>
      <select
        v-model="form.categoryId"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="category in categories" :key="category.categoryId" :value="category.name">
          {{ category.name }}
        </option>
      </select>
      <p v-if="errors.categoryId" class="text-red-500 text-sm">{{ errors.categoryId[0] }}</p>
    </div>

    <div class="mb-4 py-2">
<!--      <label class="inline-flex items-center cursor-pointer">-->
<!--        <input type="checkbox"  class="sr-only peer" />-->
<!--        <div class="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full"></div>-->
<!--        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Favorite</span>-->
<!--      </label>-->
      <label class="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" v-model="form.isFavorite" value="" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Favorite</span>
      </label>
    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Color</label>
      <input
        v-model="form.color"
        type="text"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Size</label>
      <input
        v-model="form.size"
        type="text"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="mb-4 py-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Season</label>
      <select
        v-model="form.season"
        class="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="summer">Summer</option>
        <option value="winter">Winter</option>
        <option value="autumn">Autumn</option>
        <option value="spring">Spring</option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full text-white mt-3 bg-gradient-to-r from-purple-500 to-indigo-500  font-medium rounded-lg px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Add Item
    </button>
  </form>
  </div>
  </div>
</template>

<style scoped>

</style>
