import { HouseholdCreator } from "@/components/household-creator";
import { useHouseholds } from "@/hooks/useHousehold";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";

import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useState } from "react";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { households, isLoading } = useHouseholds();

  return (
    <div>
      {households?.length === 0 ? (
        <HouseholdCreator />
      ) : (
        households?.map((household) => (
          <div key={household._id} className="p-4">
            <h2 className="text-2xl font-bold">{household.name}</h2>
            <p className="text-gray-600">Household ID: {household._id}</p>
          </div>
        ))
      )}
    </div>
  );
}
