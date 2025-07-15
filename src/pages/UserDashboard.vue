<script setup lang="ts">
import DashboardNav from '@/components/DashboardNav.vue'
import TaskCalender from '@/components/TaskCalender.vue'
import TasksList from '@/components/TasksList.vue'
import TodaysSchedule from '@/components/TodaysSchedule.vue'
</script>
<template>
  <div class="bg-gray-100 h-screen">
    <DashboardNav />
    <div class="grid grid-cols-4">
      <div class="col-span-1">
        <TodaysSchedule />
      </div>
      <div class="col-span-2">
        <TaskCalender />
      </div>
      <div class="col-span-1">
        <TasksList />
      </div>
    </div>
  </div>
</template>
