import { defineStore } from 'pinia';
import type { Task } from '../types';

export const useBoardStore = defineStore('board', {
  state: () => ({
    columns: [
        {
          id: 'todo',
          name: 'To Do',
          tasks: [
            { id: '1', title: 'Buy groceries' },
            { id: '2', title: 'Clean the room' },
          ] as Task[],
        },
        {
          id: 'in-progress',
          name: 'In Progress',
          tasks: [
            { id: '3', title: 'Write report' },
          ] as Task[],
        },
        {
          id: 'done',
          name: 'Done',
          tasks: [
            { id: '4', title: 'Fix bugs' },
          ] as Task[],
        },
      ],
  }),
  actions: {
    moveTask(taskId: string, fromCol: string, toCol: string, newIndex: number) {
      const from = this.columns.find(c => c.id === fromCol);
      const to = this.columns.find(c => c.id === toCol);
      if (!from || !to) return;

      const task = from.tasks.find(t => t.id === taskId);
      if (!task) return;

      from.tasks = from.tasks.filter(t => t.id !== taskId);
      to.tasks.splice(newIndex, 0, task);
    },
  },
});