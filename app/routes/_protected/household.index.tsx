import { convexQuery, useConvexQuery } from "@convex-dev/react-query";
import {
  createFileRoute,
  redirect,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useAuth } from "@clerk/tanstack-start";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideHouse, UserPlus } from "lucide-react";

export const Route = createFileRoute("/_protected/household/")({
  beforeLoad: async ({ context }) => {
    const { userId } = context;

    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Prüfen, ob der Nutzer bereits einen Haushalt hat (mit seiner userId)
    const household = await context.queryClient.fetchQuery(
      convexQuery(api.household.getUserHoushold, { userId })
    );

    // Wenn ja, zum Haushalt-Dashboard weiterleiten
    if (household && household._id) {
      throw redirect({
        to: "/household/$householdId",
        params: { householdId: household._id },
        replace: true,
      });
    }

    throw redirect({
      to: "/household/welcome",
      replace: true,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      TEST
      <Outlet />
    </div>
  );
}
