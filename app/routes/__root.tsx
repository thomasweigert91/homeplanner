// app/routes/__root.tsx
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { ClerkProvider, useAuth } from "@clerk/tanstack-start";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import appCss from "@/styles/app.css?url";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "@clerk/tanstack-start/server";
import { getWebRequest } from "vinxi/http";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await getAuth(getWebRequest());
  const token = await auth.getToken({ template: "convex" });

  return {
    userId: auth.userId,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    title: "TanStack Start Starter",
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchClerkAuth();

    const { userId, token } = auth;

    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const context = useRouteContext({ from: Route.id });
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={context.convexClient}>
        <html>
          <head>
            <HeadContent />
          </head>
          <body className="h-full bg-gray-800 text-gray-100">
            {children}
            <Scripts />
          </body>
        </html>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
