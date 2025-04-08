<template>
    <div class="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded shadow mb-4 sm:mb-0 sm:hover:shadow">
      <h2 class="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">{{ column.name }}</h2>
  
      <div class="space-y-2">
        <div v-for="task in column.tasks" :key="task.id">
          <TaskCard 
            :task="task" 
            @delete="deleteTask(task.id)"
            @update="updateTask"
          />
        </div>
      </div>
  
      <div class="mt-3 sm:mt-4">
        <input 
          v-model="newTask" 
          placeholder="New task..." 
          class="w-full text-sm sm:text-base p-2 sm:p-2.5 text-black rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button 
          @click="addTask" 
          class="mt-2 w-full sm:w-auto bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-blue-600 text-sm sm:text-base transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import TaskCard from './layout/TaskCard.vue';
  import { ref } from 'vue';
  import { useBoardStore } from '../store/board';
  import type { Task } from '../types';
  
  const props = defineProps<{ column: { id: string, name: string, tasks: Task[] } }>();
  const board = useBoardStore();
  
  const newTask = ref('');
  
  function addTask() {
    if (!newTask.value.trim()) return;
    board.columns.find(col => col.id === props.column.id)?.tasks.push({
      id: Date.now().toString(),
      title: newTask.value,
      description: '', 
      status: 'todo' 
    });
    newTask.value = '';
  }
  
  function deleteTask(taskId: string) {
    const col = board.columns.find(c => c.id === props.column.id);
    if (col) col.tasks = col.tasks.filter(t => t.id !== taskId);
  }

  function updateTask(updatedTask: Task) {
  const col = board.columns.find(c => c.id === props.column.id);
  if (col) {
    const taskIndex = col.tasks.findIndex(t => t.id === updatedTask.id);
    if (taskIndex !== -1) {
      col.tasks[taskIndex] = updatedTask;
            }
        }
    }
</script>
  
<style scoped>
@media (max-width: 360px) {
  .kanban-column {
    padding: 0.75rem;
  }
}
</style>