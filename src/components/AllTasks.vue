<script setup lang="ts">
import { ref } from 'vue'
import type { Task, Subtask } from '../utils/tasksData'
// import { tasks as initialTasks } from '../utils/tasksData'
import axios from 'axios'

const tasks = ref<Task[]>([])

const API_URL = 'http://localhost:5000/api'
const loadTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks?userId=687e03499615eae999d33b77`)
    const data = response.data
    tasks.value = data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}
loadTask()

const form = ref({
  title: '',
  description: '',
  category: '',
  date: '',
  time: '',
  subtask: '',
  subtasks: [] as Subtask[],
})

const editingIndex = ref<number | null>(null)
const isEditing = ref(false)

const editTask = (index: number) => {
  const task = tasks.value[index]
  form.value = {
    title: task.title,
    description: task.description,
    category: task.category,
    date: task.date,
    time: task.time,
    subtask: '',
    subtasks: [...task.subtasks],
  }
  editingIndex.value = index
  isEditing.value = true
}
const deleteTask = async (index: number) => {
  const task = tasks.value[index]
  try {
    await axios.delete(`${API_URL}/tasks/${task._id}`, {
      data: { userId: '687e03499615eae999d33b77' },
    })
    await loadTask()
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}
const addTask = async () => {
  if (!form.value.title) return
  const newTask = {
    title: form.value.title,
    description: form.value.description,
    category: form.value.category,
    date: form.value.date,
    time: form.value.time,
    subtasks: [...form.value.subtasks],
    completed: false,
    userId: '687e03499615eae999d33b77',
  }
  try {
    await axios.post(`${API_URL}/tasks/`, newTask)
    await loadTask()
    resetForm()
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

const updateTask = async () => {
  if (editingIndex.value === null || !form.value.title) return
  const task = tasks.value[editingIndex.value]
  const updatedTask = {
    title: form.value.title,
    description: form.value.description,
    category: form.value.category,
    date: form.value.date,
    time: form.value.time,
    subtasks: [...form.value.subtasks],
    completed: false,
  }
  try {
    await axios.put(`${API_URL}/tasks/${task._id}`, updatedTask)
    await loadTask()
    resetForm()
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    subtask: '',
    subtasks: [],
  }
  editingIndex.value = null
  isEditing.value = false
}
const addSubtask = () => {
  if (!form.value.subtask) return
  form.value.subtasks.push({
    title: form.value.subtask,
    completed: false,
  })
  form.value.subtask = ''
}
const removeSubtask = (index: number) => {
  form.value.subtasks.splice(index, 1)
}

const toggleSubtask = async (taskIndex: number, subtaskIndex: number) => {
  const task = tasks.value[taskIndex]
  const subtasks = [...task.subtasks]
  subtasks[subtaskIndex].completed = !subtasks[subtaskIndex].completed
  const allSubtasksCompleted = subtasks.every((subtask) => subtask.completed)
  const updatedTask = {
    ...task,
    subtasks,
    completed: allSubtasksCompleted,
  }
  try {
    await axios.put(`${API_URL}/tasks/${task._id}`, updatedTask)
    await loadTask()
  } catch (error) {
    console.error('Error updating subtask:', error)
  }
}

const formatDayName = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' })
}
</script>
<template>
  <div class="grid md:grid-cols-3 p-10 gap-5">
    <div class="md:col-span-2 bg-white p-5 shadow shadow-gray-100">
      <h2 class="font-bold border-b border-b-gray-400 p-2">My Tasks</h2>
      <ul class="p-5 space-y-4">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="flex w-full shadow shadow-gray-200 p-4 rounded-lg hover:shadow-gray-300 transition-shadow"
        >
          <div class="flex-1">
            <p class="text-gray-500">{{ task.time }}</p>
            <p class="font-medium">
              {{ formatDayName(task.date) }}
            </p>
          </div>
          <div class="flex-3 ml-4">
            <h4 class="font-medium">
              {{ task.title }}
              <span class="text-gray-200">{{ task.completed ? ' ✔️' : ' ✖️' }}</span>
            </h4>
            <p class="text-sm text-gray-600">{{ task.description }}</p>
            <p class="text-xs mt-1">
              <span class="px-2 py-1 bg-gray-100 rounded-full">{{ task.category }}</span>
            </p>
            <ul class="mt-2 space-y-1">
              <li
                v-for="(subtask, subtaskIndex) in task.subtasks"
                :key="subtaskIndex"
                class="flex items-center text-sm"
              >
                <input
                  type="checkbox"
                  :checked="subtask.completed"
                  @change="toggleSubtask(index, subtaskIndex)"
                  class="mr-2"
                />
                <span :class="{ 'line-through text-gray-400': subtask.completed }">{{
                  subtask.title
                }}</span>
              </li>
            </ul>
          </div>
          <div class="flex-1 space-x-2">
            <button
              class="px-2 py-1 bg-gray-300 text-blue-600 hover:bg-gray-400 rounded"
              @click="editTask(index)"
            >
              Edit
            </button>
            <button
              class="px-2 py-1 bg-red-100 text-blue hover:bg-red-200 rounded"
              @click="deleteTask(index)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="md:col-span-1 bg-white p-5 shadow shadow-gray-100 rounded-lg">
      <h2 class="text-center p-2 border-b border-b-gray-400 font-bold">
        {{ isEditing ? 'Edit Task' : 'Add Task' }}
      </h2>
      <form class="flex flex-col gap-3 mt-4" @submit.prevent="isEditing ? updateTask() : addTask()">
        <div>
          <label for="title"> Title </label>
          <input
            class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            id="title"
            type="text"
            v-model="form.title"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            id="description"
            type="text"
            v-model="form.description"
          ></textarea>
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700"> Category </label>
          <select
            class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            id="category"
            type="text"
            v-model="form.category"
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700"> Date: </label>
            <input
              class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
              id="date"
              type="date"
              v-model="form.date"
            />
          </div>
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700"> Time: </label>
            <input
              class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
              id="time"
              type="time"
              v-model="form.time"
            />
          </div>
        </div>
        <div>
          <label for="subtask" class="block text-sm font-medium text-gray-700">Subtask</label>
          <div class="flex">
            <input
              class="border rounded border-gray-300 w-full p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="subtask"
              type="text"
              placeholder="Add Subtask"
              v-model="form.subtask"
            />
            <button
              @click.prevent="addSubtask"
              type="button"
              class="px-3 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          <ul v-if="form.subtasks.length">
            <li
              v-for="(subtask, index) in form.subtasks"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span>{{ subtask.title }}</span>
              <button
                @click.prevent="removeSubtask(index)"
                type="button"
                class="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          </ul>
        </div>
        <div class="flex space-x-3 mt-4">
          <button
            type="submit"
            class="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {{ isEditing ? 'Update Task' : 'Add Task' }}
          </button>
          <button
            v-if="isEditing"
            @click="resetForm"
            type="button"
            class="py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
