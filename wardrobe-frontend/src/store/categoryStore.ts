import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axiosInstance from "@/lib/axios.ts";

export interface Category {
  categoryId: number;
  name: string;
  created_at: string;
}

export const useCategoryStore = defineStore("category", () => {
  const categories = ref<Category[]>([]);
  const isLoading = ref(false);

  const fetchCategories = async () => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get("/category");
      categories.value = response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const addCategory = async (name: string) => {
    try {
      await axiosInstance.post("/category", { name });
      await fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await axiosInstance.delete(`/category/${categoryId}`);
      categories.value = categories.value.filter(c => c.categoryId !== categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const totalCategories = computed(() => categories.value.length);

  return {
    categories,
    isLoading,
    fetchCategories,
    addCategory,
    deleteCategory,
    totalCategories,
  };
});
