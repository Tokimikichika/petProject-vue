import { ref, watchEffect } from 'vue';

export function useTheme() {
  const dark = ref(localStorage.getItem('theme') === 'dark');

  watchEffect(() => {
    if (dark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
  return { dark };
}