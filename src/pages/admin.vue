<script setup lang="ts">
useHead({ title: 'Admin' })

const { data, status } = await useFetch('/api/admin/users')

const columns = [
  { key: 'username', label: 'Username' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Admin</h1>
      <p class="text-gray-500">Only admin accounts can open this page and its API.</p>
    </div>

    <UCard :ui="{ body: { padding: '' } }">
      <template #header>
        <h2 class="font-semibold text-gray-900 dark:text-white">Registered users</h2>
      </template>

      <UTable :rows="data?.users ?? []" :columns="columns" :loading="status === 'pending'">
        <template #role-data="{ row }">
          <UBadge :color="row.role === 'admin' ? 'primary' : 'gray'" variant="subtle" :label="row.role" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
