<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task } from '../utils/tasksData'
import { tasks as initialTasks } from '../utils/tasksData'
const tasks = ref<Task[]>(initialTasks)

const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const todayTask = computed(() => {
  const today = getTodayDate()
  return tasks.value.filter((task) => task.date === today)
})

const toggleSubtask = (taskIndex: number, subtaskIndex: number) => {
  tasks.value[taskIndex].subtasks[subtaskIndex].completed =
    !tasks.value[taskIndex].subtasks[subtaskIndex].completed
}
</script>
<template>
  <div class="h-full">
    <h2 class="p-2">Welcome, John Doe</h2>
    <div class="bg-white rounded-2xl p-3 min-h-[50vh] flex flex-col">
      <p>Today's Tasks</p>
      <ul class="p-3" v-if="todayTask.length">
        <li v-for="(task, taskIndex) in todayTask" :key="taskIndex">
          <p class="font-medium">{{ task.title }}</p>
          <p class="px-2 py-1 bg-gray-100 rounded-full w-fit">{{ task.category }}</p>
          <div class="flex gap-3 my-2 w-full">
            <p class="text-sm text-gray-600 flex-1">{{ task.description }}</p>
            <p class="px-2 py-1 bg-gray-100 rounded-full">{{ task.time }}</p>
          </div>
          <ul v-for="(subtask, subtaskIndex) in task.subtasks" :key="subtaskIndex" class="p-1">
            <li>
              <input
                type="checkbox"
                :checked="subtask.completed"
                class="mr-2"
                @change="toggleSubtask(taskIndex, subtaskIndex)"
              />
              <span :class="{ 'line-through text-gray-400': subtask.completed }">{{
                subtask.title
              }}</span>
            </li>
          </ul>
          <p></p>
        </li>
      </ul>
      <ul v-else class="flex-1 p-3">
        <p>There are no tasks scheduled today</p>
      </ul>
      <button class="p-2 w-3/4 text-white border border-gray-500 rounded-xl bg-sky-700">
        Add Task
      </button>
    </div>
  </div>
</template>
