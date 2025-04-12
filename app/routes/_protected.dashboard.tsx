import { HouseholdCreator } from "@/components/household-creator";
import { TaskCreator } from "@/components/task-creator";

import { useHouseholds } from "@/hooks/useHousehold";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/_protected/dashboard")({
  loader: async (ctx) => {
    // Ensure the user is authenticated
    const user = ctx.context.userId;
    if (!user) {
      throw new Error("User not authenticated");
    }
    await ctx.context.queryClient.ensureQueryData({
      ...convexQuery(api.household.getUserHoushold, {}),
    });
    await ctx.context.queryClient.ensureQueryData({
      ...convexQuery(api.tasks.getTasks, {}),
    });
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading tasks</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const tasksQuery = useSuspenseQuery({
    ...convexQuery(api.tasks.getTasks, {}),
  });

  const tasks = tasksQuery.data;
  const { households } = useHouseholds();

  return (
    <div>
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
      <TaskCreator />

      {tasks.map((task) => (
        <div key={task._id} className="p-4">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600">Task ID: {task._id}</p>
        </div>
      ))}
    </div>
  );
}
