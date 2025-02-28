import { defineStore } from "pinia";
import { reactive, ref, onMounted } from "vue";
import axiosInstance from "@/lib/axios.ts";
import { AxiosError } from "axios";
import {useAuthStore} from "@/store/auth.ts";
import { notify } from "@kyvg/vue3-notification";
import type {Category} from "@/store/categoryStore.ts";
import router from "@/router";

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

interface WardrobeItemResponse {
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
  const auth = useAuthStore();
  const isLoading = ref(false);
  const isLoading2 = ref(false);
  const items = ref<WardrobeItemResponse[]>([]);

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

    if (auth.user?.id) {
      formData.append("userId", auth.user.id.toString());
    }



    isLoading2.value = true;

    try {
      await axiosInstance.post("/clothing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notify({
        title: "Success",
        text: "Item added successfully!",
      });

    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
    }finally {
      isLoading2.value = false;
    }
  };

  const fetchItems = async () => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get("/clothing");
      items.value = response.data.clothings;
    } catch (error) {
      console.error("Error fetching outfits:", error);
      notify({
        title: "Error",
        text: "Error fetching outfits!",
      });
    } finally {
      isLoading.value = false;
    }
  };


  const deleteItem = async (clothingId: number) => {
    try {
      await axiosInstance.delete(`/clothing/${clothingId}`);
      items.value = items.value.filter((c) => c.clothingId !== clothingId);
    } catch (error) {
      console.error("Error deleting item:", error);
      notify({
        title: "Error",
        text: "Error deleting item!",
      });
    }
  };

  //updateItem
  const updateItem = async (updatedItem: FormData, id: string) => {
    //log the updated item
    for (var pair of updatedItem.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
    try {
      await axiosInstance.post(`/clothing/${id}`, updatedItem,{
        headers: { "Content-Type": "multipart/form-data" },
      });
      // const index = items.value.findIndex((item) => item.clothingId === updatedItem.clothingId);
      // if (index !== -1) {
      //   items.value[index] = updatedItem;
      // }
      notify({
        title: "Success",
        text: "Item updated successfully!",
      });
      router.push("/outfits");
    } catch (error) {
      console.error("Error updating item:", error);
      notify({
        title: "Error",
        text: "Error updating item!",
      });
    }
  }
  onMounted(fetchCategories);


  return {
    items,
    isLoading,
    form,
    errors,
    categories,
    submitForm,
    fetchItems,
    fetchCategories,
    deleteItem,
    updateItem
  };
});
