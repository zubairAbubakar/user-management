/**
 * An array of routes that are accessible to the public.
 * Theese routes are not protected by the authentication middleware.
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are protected by the authentication middleware.
 * Theese routes are protected by the authentication middleware.
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * An prefix for the API routes that are protected by the authentication middleware.
 * Theese routes are protected by the authentication middleware.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The deault route to redirect to after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
