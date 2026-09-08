<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useHead({ title: 'Login' })

const accounts = [
  { role: 'Admin', username: 'admin', password: 'admin' },
  { role: 'Employee', username: 'employee', password: 'employee' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
        <UIcon name="i-heroicons-cube-transparent" class="h-7 w-7" />
      </div>
      <h1 class="mt-3 text-2xl font-bold text-gray-900 dark:text-white">Nuxt Portal</h1>
      <p class="text-sm text-gray-500">Login to access your dashboard</p>
    </div>

    <LoginForm />

    <UCard :ui="{ body: { padding: 'px-4 py-3 sm:p-4' } }">
      <p class="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Demo accounts</p>
      <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <li v-for="account in accounts" :key="account.username" class="flex justify-between gap-4">
          <span>{{ account.role }}</span>
          <span class="font-mono">{{ account.username }} / {{ account.password }}</span>
        </li>
      </ul>
    </UCard>
  </div>
</template>
