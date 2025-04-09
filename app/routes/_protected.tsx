import { SignedIn } from "@clerk/clerk-react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location, context }) => {
    const isAuthenticated = context.userId;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
  errorComponent: () => <div>Protected Route Error</div>,
});

function RouteComponent() {
  return (
    <SignedIn>
      <Outlet />
    </SignedIn>
  );
}
