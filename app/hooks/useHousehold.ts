import { useAuth } from "@clerk/tanstack-start";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export const useHouseholds = () => {
  const { data: households, isLoading } = useSuspenseQuery({
    ...convexQuery(api.household.getUserHoushold, {}),
  });

  return { households, isLoading };
};
