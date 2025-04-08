<template>
  <div class="min-h-screen h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="flex justify-end p-4">
      <ThemeToggle />
    </div>
    <main class="flex-1 p-4 text-black dark:text-white overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue';
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>