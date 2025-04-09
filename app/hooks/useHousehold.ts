import { useAuth } from "@clerk/tanstack-start";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export const useHouseholds = () => {
  const { data: households, isLoading } = useQuery({
    ...convexQuery(api.household.getUserHousholds, {}),
  });

  return { households, isLoading };
};
