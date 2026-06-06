import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/collections(.*)",
  "/cart(.*)",
  "/products(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// TIRED PLUS SLOW INTERNET THANK YOU

export const config = {
  matcher: ["/((?!_next|[^?]*\\.[^?]*$).*)", "/(api|trpc)(.*)"],
};
