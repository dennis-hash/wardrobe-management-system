<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from "@/views/Layout/Navbar.vue";
import Footer from "@/views/Layout/Footer.vue";
</script>

<template>
  <header></header>
      <Navbar/>
      <RouterView/>
      <Footer/>
</template>

