// store.ts
import { defineStore } from "pinia";
import {useWardrobeStore} from "@/store/wardrobeStore.ts";
import router from "@/router";

//const itemStore = useWardrobeStore();
export const useItemStore = defineStore("itemStore", {
  state: () => ({
    outfits: [] as any[],
    selectedItem: null as any,
  }),
  actions: {
    setSelectedItem(item: any) {
      this.selectedItem = item;
    },
    updateItem(form: any) {
      const index = this.outfits.findIndex((item) => item.id === form.id);
      if (index !== -1) {
        this.outfits[index] = form;
      }



    },
  },




});
