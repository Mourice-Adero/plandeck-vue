<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  {
    title: 'Complete Project Proposal',
    description: 'Draft and submit the client project proposal by EOD.',
    category: 'Work',
    date: '2023-11-15',
    time: '14:00',
    subtasks: [
      { title: 'Research competitors', completed: false },
      { title: 'Outline key features', completed: true },
      { title: 'Review with team', completed: false },
    ],
  },
  {
    title: 'Grocery Shopping',
    description: 'Buy essentials for the week.',
    category: 'Personal',
    date: '2023-11-16',
    time: '10:30',
    subtasks: [
      { title: 'Milk', completed: false },
      { title: 'Eggs', completed: false },
      { title: 'Vegetables', completed: true },
    ],
  },
  {
    title: 'Morning Workout',
    description: '30-minute cardio session.',
    category: 'Health',
    date: '2023-11-17',
    time: '07:00',
    subtasks: [
      { title: 'Warm-up stretches', completed: false },
      { title: 'Running', completed: false },
    ],
  },
  {
    title: 'Read Vue 3 Documentation',
    description: 'Study Composition API updates.',
    category: 'Learning',
    date: '2023-11-18',
    time: '20:00',
    subtasks: [
      { title: 'Setup example project', completed: true },
      { title: 'Try reactive examples', completed: false },
    ],
  },
])
const title = ref('')
const description = ref('')
const category = ref('')
const date = ref('')
const time = ref('')
const subtask = ref('')
</script>
<template>
  <div class="grid md:grid-cols-3 p-10 gap-5">
    <div class="md:col-span-2 bg-white p-5 shadow shadow-gray-100">
      <h2 class="font-bold border-b border-b-gray-400 p-2">My Tasks</h2>
      <ul class="p-5">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="flex w-full shadow shadow-gray-200 p-2"
        >
          <div class="flex-1">
            {{ task.time }}
            <p class="">
              {{ new Date(task.date).toLocaleDateString('en-US', { weekday: 'long' }) }}
            </p>
          </div>
          <div class="flex-3">
            <h4>{{ task.title }}</h4>
            <p>{{ task.category }}</p>
          </div>
          <div class="flex-1">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="md:col-span-1 bg-white p-5 shadow shadow-gray-100">
      <h2 class="text-center p-2 border-b border-b-gray-400 font-bold">Add Task</h2>
      <form class="flex flex-col gap-3">
        <label for="title"> Title </label>
        <input
          class="border rounded border-gray-400 bg-gray-100 p-1"
          placeholder=""
          id="title"
          type="text"
          v-model="title"
        />
        <label for="description"> Description </label>
        <input
          class="border rounded border-gray-400 bg-gray-100 p-1"
          placeholder=""
          id="description"
          type="text"
          v-model="description"
        />
        <label for="category"> Category </label>
        <select
          class="border rounded border-gray-400 bg-gray-100 p-1"
          placeholder=""
          id="category"
          type="text"
          v-model="category"
        >
          <option value="">Select Category</option>
          <option value="">Work</option>
          <option value="">Health</option>
          <option value="">Personal</option>
          <option value="">Gym</option>
        </select>
        <div class="w-full">
          <label for="date"> Date: </label>
          <input
            class="border rounded border-gray-400 bg-gray-100 p-1 w-1/2"
            placeholder=""
            id="date"
            type="date"
            v-model="date"
          />
          <label for="time"> Time: </label>
          <input
            class="border rounded border-gray-400 bg-gray-100 p-1"
            placeholder=""
            id="time"
            type="time"
            v-model="time"
          />
        </div>
        <input
          class="border rounded border-gray-400 bg-gray-100 p-1"
          id=""
          type="text"
          placeholder="Add Subtask"
          v-model="subtask"
        />
        <button
          class="p-1 w-1/2 self-center text-white border border-gray-500 rounded-xl bg-sky-700"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>
