<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from "@/views/Layout/Navbar.vue";
import Footer from "@/views/Layout/Footer.vue";
import {useAuthStore} from "@/store/auth.ts";
import {onMounted, ref} from "vue";
import type {User} from "@/types";

const auth = useAuthStore();

const user = ref<User| null>(null);


</script>

<template>
  <header></header>
      <Navbar v-if="auth.isLoggedIn"/>
    <main>
      <RouterView/>
    </main>
      <Footer v-if="auth.isLoggedIn"/>
</template>

