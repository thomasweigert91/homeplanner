import { User } from "@clerk/tanstack-start/server";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/_protected/household")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Mein Haushalt</h1>
        <UserButton />
      </nav>

      <Outlet />
    </>
  );
}
