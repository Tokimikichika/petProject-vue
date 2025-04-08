<template>
    <div class="bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 sm:p-3 mb-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center group hover:shadow transition-shadow relative sm:hover:shadow">
      <div class="flex items-center flex-1 w-full sm:w-auto" >
        <button 
          @click="toggleComplete"
          class="mr-2 w-5 h-5 rounded border border-gray-400 flex-shrink-0 flex items-center justify-center"
          :class="{
            'bg-green-500 border-green-500': task.status === 'done',
            'hover:bg-gray-200 dark:hover:bg-gray-600': task.status !== 'done'
          }"
          title="Mark as done"
        >
          <span v-if="task.status === 'done'" class="text-white text-sm">✓</span>
        </button>
        
        <div class="flex-1 relative min-w-0">
          <span 
            class="block truncate text-xs xs:text-sm sm:text-base break-words"
            :class="{ 'line-through text-gray-500 dark:text-gray-400': task.status === 'done' }"
          >
            {{ task.title }}
          </span>
          
          <input 
            v-if="isEditing"
            v-model="editedTitle"
            @keyup.enter="saveEdit"
            @blur="saveEdit"
            @keyup.esc="cancelEdit"
            class="absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-600 text-sm sm:text-base text-black dark:text-white px-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-focus
          >
        </div>
      </div>
      
      <div class="flex space-x-2 mt-2 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-full sm:w-auto justify-end">
        <button 
          v-if="task.status !== 'done'"
          @click="startEditing"
          class="text-blue-500 hover:text-blue-700 p-1 text-sm sm:text-base"
          title="Edit"
        >
          ✏️
        </button>
        <button 
          @click="$emit('delete')" 
          class="text-red-500 hover:text-red-700 p-1 text-sm sm:text-base"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../types';

const props = defineProps<{ task: Task }>();
const emit = defineEmits(['delete', 'update']);

const isEditing = ref(false);
const editedTitle = ref(props.task.title);

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
};

function toggleComplete() {
  const newStatus = props.task.status === 'done' ? 'todo' : 'done';
  emit('update', { ...props.task, status: newStatus });
}

function startEditing() {
  isEditing.value = true;
  editedTitle.value = props.task.title;
}

function saveEdit() {
  if (editedTitle.value.trim() && editedTitle.value !== props.task.title) {
    emit('update', { ...props.task, title: editedTitle.value });
  }
  isEditing.value = false;
}

function cancelEdit() {
  isEditing.value = false;
}
</script>

<style scoped>
@media (max-width: 360px) {
  .task-card {
    padding: 0.5rem;
  }
}
.input-enter-active,
.input-leave-active {
  transition: all 0.2s ease;
}

.input-enter-from,
.input-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.truncate {
  word-break: break-word;
}
</style>