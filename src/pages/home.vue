<script setup lang="ts">
useHead({ title: 'Home' })

const route = useRoute()
const { user, isAdmin } = useAuth()

const accessDenied = computed(() => route.query.denied === 'admin')
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {{ user?.name }}
      </h1>
      <p class="text-gray-500">This is the landing page for every signed in user.</p>
    </div>

    <UAlert
      v-if="accessDenied"
      color="red"
      variant="subtle"
      icon="i-heroicons-lock-closed"
      title="Access denied"
      description="The admin page is restricted to admin accounts, so you were redirected back here."
    />

    <div class="grid gap-4 sm:grid-cols-2">
      <UCard>
        <template #header>
          <h2 class="font-semibold text-gray-900 dark:text-white">Your account</h2>
        </template>

        <dl class="space-y-2 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-gray-500">Name</dt>
            <dd class="font-medium text-gray-900 dark:text-white">{{ user?.name }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-gray-500">Username</dt>
            <dd class="font-medium text-gray-900 dark:text-white">{{ user?.username }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-gray-500">Role</dt>
            <dd><UBadge :color="isAdmin ? 'primary' : 'gray'" variant="subtle" :label="user?.role" /></dd>
          </div>
        </dl>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold text-gray-900 dark:text-white">Admin area</h2>
        </template>

        <p class="text-sm text-gray-500">
          {{ isAdmin
            ? 'Your role grants access to the admin page.'
            : 'Employee accounts are blocked by the permission middleware and sent back here.' }}
        </p>

        <template #footer>
          <UButton
            to="/admin"
            :color="isAdmin ? 'primary' : 'gray'"
            :variant="isAdmin ? 'solid' : 'soft'"
            icon="i-heroicons-shield-check"
            label="Open admin page"
          />
        </template>
      </UCard>
    </div>
  </div>
</template>
