<script setup lang="ts"></script>
<template>
  <div class="flex justify-between p-5 shadow shadow-gray-300 bg-white">
    <RouterLink to="/"><span>Logo</span> PlanDeck</RouterLink>
    <div class="flex gap-10">
      <RouterLink to="/tasks">Manage Tasks</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </div>
  </div>
</template>
