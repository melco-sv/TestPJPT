<script setup lang="ts">
const { user, isAdmin, logout } = useAuth()

const links = computed(() => [
  { label: 'Home', to: '/home', icon: 'i-heroicons-home' },
  ...(isAdmin.value ? [{ label: 'Admin', to: '/admin', icon: 'i-heroicons-shield-check' }] : [])
])
</script>

<template>
  <header class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <UContainer class="flex h-16 items-center justify-between gap-4">
      <div class="flex items-center gap-6">
        <NuxtLink to="/home" class="text-lg font-semibold text-gray-900 dark:text-white">
          Nuxt Portal
        </NuxtLink>

        <nav class="flex items-center gap-1">
          <UButton
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :icon="link.icon"
            :label="link.label"
            color="gray"
            variant="ghost"
          />
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden text-right sm:block">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user?.name }}</p>
          <p class="text-xs text-gray-500">@{{ user?.username }}</p>
        </div>

        <UBadge :color="isAdmin ? 'primary' : 'gray'" variant="subtle" :label="user?.role" />

        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-arrow-right-on-rectangle"
          label="Logout"
          @click="logout"
        />
      </div>
    </UContainer>
  </header>
</template>
