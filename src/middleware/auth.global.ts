export default defineNuxtRouteMiddleware((to) => {
  const { user, isAdmin } = useAuth()

  if (to.path === '/login') {
    return user.value ? navigateTo('/home') : undefined
  }

  if (!user.value) {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/admin') && !isAdmin.value) {
    return navigateTo('/home?denied=admin')
  }
})
