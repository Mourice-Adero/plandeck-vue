<script setup lang="ts">
import { ref } from 'vue'

interface User {
  username: string
  fullName: string
  email: string
  profile: string
}

const user = ref<User>({
  fullName: 'John Doe',
  username: 'JDoe',
  email: 'johndoe@gmail.com',
  profile: '../assets/imsges/profile',
})
const form = ref({
  fullName: 'John Doe',
  username: 'JDoe',
  email: 'johndoe@gmail.com',
  profile: '',
  password: '',
})
const imageSrc = user.value.profile
const updateProfile = () => {
  user.value = {
    fullName: form.value.fullName,
    username: form.value.username,
    email: form.value.email,
    profile: form.value.profile,
  }
}
</script>
<template>
  <div class="p-5">
    <p>Welcome, John Doe</p>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-white p-10 rounded-xl">
        <div><img :src="imageSrc" alt="profilePic" /></div>
        <div>
          <p>Username: {{ user.username }}</p>
          <p>Full name: {{ user.fullName }}</p>
          <p>Email: {{ user.email }}</p>
        </div>
      </div>
      <form class="bg-white p-10 rounded-xl" @submit.prevent="updateProfile">
        <div>
          <label for="username">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="w-full rounded border border-gray-400 p-1 mb-5"
          />
        </div>
        <div>
          <label for="fullName">Full name</label>
          <input
            v-model="form.fullName"
            type="text"
            id="username"
            class="w-full rounded border border-gray-400 p-1 mb-5"
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            v-model="form.email"
            type="text"
            id="email"
            class="w-full rounded border border-gray-400 p-1 mb-5"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="form.password"
            type="text"
            id="password"
            class="w-full rounded border border-gray-400 p-1 mb-5"
          />
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 p-2 rounded">Update</button>
      </form>
    </div>
  </div>
</template>
