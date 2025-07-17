<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../utils/tasksData'
import { tasks as initialTasks } from '../utils/tasksData'

const tasks = ref<Task[]>(initialTasks)

const toggleTask = (taskIndex: number) => {
  tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed
  const completedTask = tasks.value[taskIndex]
  if (completedTask.completed) {
    completedTask.subtasks.forEach((subtask) => {
      subtask.completed = true
    })
  } else {
    completedTask.subtasks.forEach((subtask) => {
      subtask.completed = false
    })
  }
}
</script>
<template>
  <div class="bg-white rounded-2xl h-full p-3">
    <ul class="py-3" v-if="tasks.length">
      <li
        v-for="(task, taskIndex) in tasks"
        :key="taskIndex"
        class="flex gap-2 p-2 mt-2 shadow shadow-gray-300"
      >
        <input
          type="checkbox"
          :checked="task.completed"
          class="mr-2"
          @change="toggleTask(taskIndex)"
        />
        <div>
          <p class="font-medium">{{ task.title }}</p>
          <p class="px-2 py-1 bg-gray-100 rounded-full w-fit">{{ task.category }}</p>
          <p class="text-sm text-gray-600 flex-1">{{ task.description }}</p>
        </div>
        <p class="p-2 bg-gray-100 rounded-full self-center">
          {{ task.completed ? 'Done' : task.time }}
        </p>
      </li>
    </ul>
  </div>
</template>
