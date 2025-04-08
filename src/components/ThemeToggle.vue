<template>
    <button @click="toggleTheme" class="px-4 py-2 rounded-md border border-gray-300 dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      {{ isDark ? '🌙 Dark' : '☀️ Light' }}
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const isDark = ref(false);
  
  function toggleTheme() {
    isDark.value = !isDark.value;
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  onMounted(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    }
  });
  </script>
  