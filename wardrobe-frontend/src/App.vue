<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from "@/views/Layout/Navbar.vue";
import Footer from "@/views/Layout/Footer.vue";
import {useAuthStore} from "@/store/auth.ts";
import {onMounted, ref} from "vue";
import type {User} from "@/types";
import { useRoute } from "vue-router";
import {Notifications} from "@kyvg/vue3-notification";

const auth = useAuthStore();
const route = useRoute();

const user = ref<User| null>(null);


</script>

<template>
  <header></header>
  <notifications />
    <Navbar  v-if="auth.isLoggedIn && route.name != 'welcome'"/>
    <main>
      <RouterView/>
    </main>
      <Footer v-if="auth.isLoggedIn && route.name != 'welcome'"/>
</template>

