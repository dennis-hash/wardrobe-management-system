<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useItemStore } from "@/store/update";
import { useRouter } from "vue-router";
import {storeToRefs} from "pinia";
import {useWardrobeStore} from "@/store/wardrobeStore.ts";


const item = useWardrobeStore();
const { categories } = storeToRefs(item);

const itemStore = useItemStore();
const router = useRouter();

const form = reactive({
  clothingId: "",
  name: "",
  description: "",
  image: null as File | null,
  type: "",
  categoryId: "",
  isFavorite: false,
  color: "",
  size: "",
  season: "",
});

onMounted(() => {
  if (itemStore.selectedItem) {
    Object.assign(form, itemStore.selectedItem);
  }
});

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    form.image = input.files[0];
  }
};


const updateItem = () => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  if (form.image instanceof File) {
    formData.append("image", form.image);
  }else {
    formData.append("image", '');
  }
  formData.append("type", form.type);
  formData.append("categoryId", form.categoryId);
  formData.append("isFavorite", form.isFavorite.toString());
  formData.append("color", form.color);
  formData.append("size", form.size);
  formData.append("season", form.season);

  item.updateItem(formData, form.clothingId);
  router.push("/outfits");
};
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-white border border-gray-300 shadow-lg p-8 rounded-md w-3/4 lg:w-3/4">
      <form @submit.prevent="updateItem">
        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Name</label>
          <input v-model="form.name" type="text" class="w-full p-2 border rounded-lg" />
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Description</label>
          <textarea v-model="form.description" class="w-full p-2 border rounded-lg"></textarea>
        </div>

        <div class="mb-7 py-2">
          <label class="block mb-2 text-sm font-medium text-gray-900">Current Image</label>
<!--          <img v-if="form.image" :src="URL.createObjectURL(form.image)" alt="Item Image" class="w-32 h-32 object-cover mb-2" />-->
          <input type="file" @change="handleFileChange" class="w-full text-sm border rounded-lg cursor-pointer" />
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Type</label>
          <input v-model="form.type" type="text" class="w-full p-2 border rounded-lg" />
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Category</label>
          <select v-model="form.categoryId" class="w-full p-2 border rounded-lg">
            <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mb-4 py-2">
          <label class="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" v-model="form.isFavorite" class="sr-only peer">
            <div class="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full"></div>
            <span class="ms-3 text-sm font-medium text-gray-900">Favorite</span>
          </label>
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Color</label>
          <input v-model="form.color" type="text" class="w-full p-2 border rounded-lg" />
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Size</label>
          <input v-model="form.size" type="text" class="w-full p-2 border rounded-lg" />
        </div>

        <div class="mb-4 py-2">
          <label class="block text-sm font-medium text-gray-900">Season</label>
          <select v-model="form.season" class="w-full p-2 border rounded-lg">
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="autumn">Autumn</option>
            <option value="spring">Spring</option>
          </select>
        </div>

        <button type="submit" class="w-full text-white mt-3 bg-blue-500 rounded-lg px-2 py-3">Update Item</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
