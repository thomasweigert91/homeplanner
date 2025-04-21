import { convexQuery, useConvexQuery } from "@convex-dev/react-query";
import {
  createFileRoute,
  redirect,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/_protected/household/")({
  beforeLoad: async ({ context }) => {
    // Prüfen, ob der Nutzer bereits einen Haushalt hat (mit seiner userId)
    const household = await context.queryClient.fetchQuery(
      convexQuery(api.household.getUserHoushold, {})
    );

    console.log("Household:", household);

    // Wenn ja, zum Haushalt-Dashboard weiterleiten
    if (!household) {
      throw redirect({
        to: "/household/welcome",
        replace: true,
      });
    } else {
      throw redirect({
        to: "/household/$householdId",
        params: { householdId: household._id },
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
