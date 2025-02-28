<script setup lang="ts">
import { useWardrobeStore } from "@/store/wardrobeStore";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router';
import { useItemStore } from "@/store/update";


const updateStore = useItemStore();
const router = useRouter();
const itemStore = useWardrobeStore();
const { form, errors, categories } = storeToRefs(itemStore);
const showModal = ref(false);


const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    form.value.image = input.files[0];
  }
};
const getCategoryName = (categoryId: number) => {
  const category = categories.value.find(cat => cat.categoryId === categoryId);
  return category ? category.name : "Unknown";
};

const navigateTo = (path: string) => {
  router.push(path);
};
const editItem = (item: any) => {
  updateStore.setSelectedItem(item);
  router.push({ name: "edit" });
};

const deleteItem = (clothingId: number) => {
  itemStore.deleteItem(clothingId);
};

onMounted(() => {
  itemStore.fetchItems();
});
</script>


<template>
  <div class="container mx-auto p-6">


    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Wardrobe Items</h1>
      <button
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="navigateTo('/add')">
        + Add Clothing Item
      </button>
    </div>
    <div class="container mx-auto p-6">

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div v-if="itemStore.isLoading" class="text-gray-600">Loading items...</div>

        <table v-if="itemStore.items.length" class="w-full border border-gray-300 rounded-lg">
          <thead>
          <tr class="bg-gray-100 text-left">
            <th class="px-4 py-2 border-b border-gray-300">#</th>
            <th class="px-4 py-2 border-b border-gray-300">Image</th>
            <th class="px-4 py-2 border-b border-gray-300">Name</th>
            <th class="px-4 py-2 border-b border-gray-300">Type</th>
            <th class="px-4 py-2 border-b border-gray-300">Category</th>
            <th class="px-4 py-2 border-b border-gray-300">Color</th>
            <th class="px-4 py-2 border-b border-gray-300">Size</th>
            <th class="px-4 py-2 border-b border-gray-300">Season</th>
            <th class="px-4 py-2 border-b border-gray-300">Date Added</th>
            <th class="px-4 py-2 border-b border-gray-300">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in itemStore.items" :key="item.clothingId" class="border-b border-gray-200">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">
              <img :src="item.image" alt="Clothing Item" class="w-12 h-12 object-cover rounded-lg" />
            </td>
            <td class="px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2">{{ item.type }}</td>
            <td class="px-4 py-2">{{ getCategoryName(item.categoryId) }}</td>
            <td class="px-4 py-2">{{ item.color }}</td>
            <td class="px-4 py-2">{{ item.size }}</td>
            <td class="px-4 py-2 capitalize">{{ item.season }}</td>
            <td class="px-4 py-2">{{ new Date(item.created_at).toLocaleDateString() }}</td>
            <td class="px-4 py-2">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition mr-2"
                @click="editItem(item)">
                Edit
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                @click="deleteItem(item.clothingId)">
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <p v-if="itemStore.items.length === 0" class="text-gray-600 mt-2">No clothing items found.</p>
      </div>
    </div>
    </div>

</template>

<style scoped>

</style>
