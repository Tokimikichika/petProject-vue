<template>
    <div class="grid grid-cols-3 gap-4">
      <KanbanColumn v-for="column in columns" :key="column.id" :column="column" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useBoardStore } from '../store/board';
  import KanbanColumn from '../components/KanbanColumn.vue';
  
  const { columns } = useBoardStore();
  </script>
  