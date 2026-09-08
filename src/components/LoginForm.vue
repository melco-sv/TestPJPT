<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { Form, FormSubmitEvent } from '#ui/types'

const schema = object({
  username: string()
    .min(4, 'Must be at least 4 characters')
    .required('Required'),
  password: string()
    .min(4, 'Must be at least 4 characters')
    .required('Required')
})

type LoginSchema = InferType<typeof schema>

const { login, normalizeError } = useAuth()

const form = ref<Form<LoginSchema>>()
const state = reactive({ username: '', password: '' })
const serverError = ref('')
const pending = ref(false)

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  pending.value = true
  serverError.value = ''

  try {
    await login(event.data)
    await navigateTo('/home')
  }
  catch (error) {
    const { message, fields } = normalizeError(error)

    serverError.value = message

    if (fields.length) {
      form.value?.setErrors(fields)
    }
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Sign in</h1>
      <p class="mt-1 text-sm text-gray-500">Use your account to continue</p>
    </template>

    <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UAlert
        v-if="serverError"
        color="red"
        variant="subtle"
        icon="i-heroicons-exclamation-triangle"
        :title="serverError"
      />

      <UFormGroup label="Username" name="username" required>
        <UInput
          v-model="state.username"
          placeholder="admin"
          autocomplete="username"
          icon="i-heroicons-user"
          size="lg"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" required>
        <UInput
          v-model="state.password"
          type="password"
          placeholder="••••••"
          autocomplete="current-password"
          icon="i-heroicons-lock-closed"
          size="lg"
        />
      </UFormGroup>

      <UButton type="submit" block size="lg" :loading="pending" label="Login" />
    </UForm>
  </UCard>
</template>
