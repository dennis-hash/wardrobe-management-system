import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/lib/axios.ts";

interface ClothingItem {
  clothingId: number;
  name: string;
  description: string;
  image: string;
  type: string;
  categoryId: number;
  isFavorite: number;
  color: string;
  size: string;
  season: string;
  created_at: string;
}


export const useDashboardStore = defineStore("dashboard", () => {
  const summary = ref({
    clothingCount: 0,
    favoriteCount: 0,
    categoryCount: 0
  });

  const clothingList = ref<ClothingItem[]>([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSummary = async () => {
    try {
      loading.value = true;
      const response = await axiosInstance.get("/summary");
      summary.value = response.data;
    } catch (err) {
      //error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchWardrobeItems = async () => {
    loading.value = true;
    try {
      const response = await axiosInstance.get("/clothing");
      clothingList.value = response.data.clothings || [];
    } catch (error) {
      console.error("Error fetching wardrobe items:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    summary,
    clothingList,
    loading,
    error,
    fetchSummary,
    fetchWardrobeItems
  };
});
