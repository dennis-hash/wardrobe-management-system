import { defineStore } from "pinia";
import { reactive, ref, onMounted } from "vue";
import axiosInstance from "@/lib/axios.ts";
import { AxiosError } from "axios";

interface WardrobeItem {
  name: string;
  description: string;
  image: File | null;
  type: string;
  categoryId: string;
  isFavorite: boolean;
  color: string;
  size: string;
  season: string;
}

export const useWardrobeStore = defineStore("wardrobe", () => {
  const form = reactive<WardrobeItem>({
    name: "",
    description: "",
    image: null,
    type: "",
    categoryId: "",
    isFavorite: false,
    color: "",
    size: "",
    season: "",
  });

  const errors = reactive<Record<string, string[]>>({});
  const categories = ref<{ categoryId: number; name: string }[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      console.log("Categories:", response.data);
      categories.value = response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const submitForm = async () => {
    //errors.value = {};
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string);
      }
    });

    try {
      await axiosInstance.post("/clothing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item added successfully!");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
    }
  };

  onMounted(fetchCategories);

  return {
    form,
    errors,
    categories,
    submitForm,
  };
});
