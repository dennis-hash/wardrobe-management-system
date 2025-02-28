<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/store/categoryStore";

const categoryStore = useCategoryStore();
const newCategoryName = ref("");
const showModal = ref(false);

const handleAddCategory = async () => {
  if (!newCategoryName.value.trim()) return;
  await categoryStore.addCategory(newCategoryName.value);
  newCategoryName.value = "";
  showModal.value = false;
};

const handleDeleteCategory = async (categoryId: number) => {
  await categoryStore.deleteCategory(categoryId);
};

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <div class="container mx-auto p-6">

    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Categories</h1>
      <button
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="showModal = true">
        + Add Category
      </button>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md">


      <div v-if="categoryStore.isLoading" class="text-gray-600">Loading categories...</div>

      <table v-if="categoryStore.categories.length" class="w-full border border-gray-300 rounded-lg">
        <thead>
        <tr class="bg-gray-100 text-left">
          <th class="px-4 py-2 border-b border-gray-300">Category Name</th>
          <th class="px-4 py-2 border-b border-gray-300">Date Added</th>
          <th class="px-4 py-2 border-b border-gray-300">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categoryStore.categories" :key="category.categoryId" class="border-b border-gray-200">
          <td class="px-4 py-2">{{ category.name }}</td>
          <td class="px-4 py-2">{{ new Date(category.created_at).toLocaleDateString() }}</td>
          <td class="px-4 py-2">
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              @click="handleDeleteCategory(category.categoryId)"
            >
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <p v-if="categoryStore.totalCategories === 0" class="text-gray-600 mt-2">No categories found.</p>
    </div>


    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-semibold mb-4">Add Category</h3>
        <input
          v-model="newCategoryName"
          type="text"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter category name"
        />
        <div class="flex justify-end gap-2 py-2.5">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            @click="showModal = false"
          >
            Cancel
          </button>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            @click="handleAddCategory"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
