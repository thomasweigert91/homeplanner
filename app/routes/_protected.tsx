import { Header } from "@/components/header";
import { Menu } from "@/components/menu";
import { SignedIn } from "@clerk/clerk-react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location, context, search }) => {
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
  const { location } = useRouterState();
  const route = location.pathname
    .split("/")
    .slice(1)
    .join()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <SignedIn>
      <Header route={route} />
      <Menu />
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </SignedIn>
  );
}
