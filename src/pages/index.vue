<script setup lang="ts">
definePageMeta({
  middleware() {
    const { user } = useAuth()

    return navigateTo(user.value ? '/home' : '/login', { replace: true })
  }
})
</script>

<template>
  <div />
</template>
