import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Bell, BellDot, LucideBellDot, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/household")({
  component: RouteComponent,
});

function RouteComponent() {
  const { location } = useRouterState();
  const { pathname } = location;

  const currentPathname = pathname
    .split("/")
    .filter(Boolean)
    .shift()
    ?.split("")
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      }
      return char;
    })
    .join("");
  console.log("Current pathname:", currentPathname);
  return (
    <>
      <nav className="flex items-center justify-between p-4 mb-4 ">
        <button className="p-2 rounded-full hover:bg-blue-200/30 text-blue-800 transition-colors">
          <PlusCircleIcon size={24} />
        </button>
        <h1 className="text-xl font-bold text-neutral-900">
          {currentPathname}
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-blue-200/30 text-blue-800 transition-colors">
            <Bell size={22} />
          </button>
          <UserButton />
        </div>
      </nav>

      <Outlet />
    </>
  );
}
