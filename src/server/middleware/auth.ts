const GUEST_ROUTES = ['/login']
const ADMIN_ROUTES = ['/admin']
const INTERNAL_PREFIXES = ['/_nuxt', '/_ipx', '/__nuxt', '/_scripts', '/.well-known']

function isPageRequest(path: string): boolean {
  if (INTERNAL_PREFIXES.some(prefix => path.startsWith(prefix))) {
    return false
  }

  return !/\.[a-z0-9]+$/i.test(path)
}

function isAdminRoute(path: string): boolean {
  return ADMIN_ROUTES.some(route => path === route || path.startsWith(`${route}/`))
}

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname
  const user = await getSessionUser(event)

  event.context.user = user

  if (path.startsWith('/api/')) {
    if (path.startsWith('/api/admin')) {
      if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'You need to sign in first' })
      }

      if (user.role !== 'admin') {
        throw createError({ statusCode: 403, statusMessage: 'Admin access only' })
      }
    }

    return
  }

  if (!isPageRequest(path)) {
    return
  }

  if (!user) {
    return GUEST_ROUTES.includes(path) ? undefined : sendRedirect(event, '/login', 302)
  }

  if (GUEST_ROUTES.includes(path) || path === '/') {
    return sendRedirect(event, '/home', 302)
  }

  if (isAdminRoute(path) && user.role !== 'admin') {
    return sendRedirect(event, '/home?denied=admin', 302)
  }
})
