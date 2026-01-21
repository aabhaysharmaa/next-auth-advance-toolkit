
import authConfig from "./auth.config";
import NextAuth from "next-auth"

import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	publicRoutes,
	authRoutes
} from "@/route";

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
	const isLoggedIn = !!req.auth;
	const { nextUrl } = req ;

	const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoutes) {
		return null;
	}

	if (isAuthRoutes) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return null
	}

	if (!isLoggedIn && !isPublicRoutes) {
		return Response.redirect(new URL("/sign-in", nextUrl))
	}
	return null;
})
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}