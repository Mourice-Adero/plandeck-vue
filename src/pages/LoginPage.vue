<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const password = ref('')
</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <form class="flex flex-col gap-10 shadow shadow-blue-950 py-20 px-10 w-3/4 md:w-2/5">
      <input
        v-model="username"
        class="p-3 border border-gray-500 rounded-xl w-full"
        placeholder="Username"
      />
      <input
        v-model="password"
        class="p-3 border border-gray-500 rounded-xl w-full"
        type="password"
        placeholder="Password"
      />
      <button class="p-3 border border-gray-500 rounded-xl w-full bg-sky-700" type="submit">
        Login
      </button>
    </form>
  </div>
</template>
