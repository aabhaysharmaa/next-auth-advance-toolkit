/**
  * An array of routes that are accessible to the public
  * These routes do not require authentication
  * @type {string}
 */

export const publicRoutes = ["/","/auth/new-verification"];

/**
  * An array of routes that are used for authentication
  * These routes will redirect logged users to /settings
  * @type {string[]}
 */

export const authRoutes = [
	"/sign-in",
	"/sign-up",
  "/error",
]

/**
  * The prefix for API authentication routes
  * routes start with this prefix are used for API Authentication
  * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
  * The Default redirect path after user successfully logged In
  * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/setting";