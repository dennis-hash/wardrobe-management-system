<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);

};

const scrollToFeatures = () => {
  const section = document.getElementById("features");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

</script>

<template>
  <div class="min-h-screen text-gray-900">

    <nav class="flex justify-between items-center p-2 bg-white shadow-sm">
      <h1 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
        Wardrobe
      </h1>
      <div class="px-4">
        <button @click="navigateTo('/login')" class="text-gray-700 hover:text-indigo-500 px-3 ">Log in</button>
        <button @click="navigateTo('/register')" class="bg-black text-white px-4 py-2 rounded-lg">Sign up</button>
      </div>
    </nav>


    <header class="text-center py-5 px-5">
      <h2 class="text-4xl font-weight:900 text-gray-900 md:text-5xl fade-in">
        Your Wardrobe, <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">Reimagined</span>
      </h2>
      <p class=" text-gray-600 py-6 px-3 mx-auto fade-in">
        Organize your clothing collection, plan outfits, and get personalized recommendations. All in one elegant platform.
      </p>

      <div class="mt-10 flex justify-center py-6 px-4 gap-4">
        <button @click="navigateTo('/register')" class="bg-black text-white px-10 py-3  rounded-lg flex items-center hover:scale-105 transition bounce">
          <span >Get Started</span>
        </button>
        <button  @click="scrollToFeatures"  class="border border-gray-400 px-10 py-3 rounded-lg hover:bg-gray-200 bounce">See Features</button>
      </div>
    </header>



    <section id="features" class="py-5 px-5 text-center">
      <h2 class="text-3xl p-20 font-bold text-gray-900">Everything you need to manage your wardrobe</h2>
      <div class="mt-8 grid gap-6  md:grid-cols-3">
        <div class="p-6 bg-white rounded-lg shadow-md">
          <span class="text-purple-500 text-3xl">👕</span>
          <h3 class="font-semibold mt-3">Digital Wardrobe</h3>
          <p class="text-gray-600">Keep track of all your clothing items in one place</p>
        </div>
        <div class="p-6 bg-white rounded-lg shadow-md">
          <span class="text-purple-500 text-3xl">🌤️</span>
          <h3 class="font-semibold mt-3">Weather Integration</h3>
          <p class="text-gray-600">Get outfit suggestions based on the weather</p>
        </div>
        <div class="p-6 bg-white rounded-lg shadow-md">
          <span class="text-purple-500 text-3xl">📅</span>
          <h3 class="font-semibold mt-3">Outfit Planning</h3>
          <p class="text-gray-600">Plan your outfits ahead for any occasion</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center py-15 bg-gray-50">
      <h2 class="text-3xl font-bold text-gray-900 ">Ready to transform your wardrobe?</h2>
      <p class="text-gray-600 mt-2 py-7">Join thousands of users who have already revolutionized their wardrobe management.</p>
      <button @click="navigateTo('/register')" class="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition">Get Started Now</button>
    </section>
  </div>
</template>

<style scoped>
/* Fade-in animation for the text */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bounce animation for the buttons */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.fade-in {
  animation: fadeIn 1.5s ease-out;
}

.bounce:hover {
  animation: bounce 1s;
}
</style>
