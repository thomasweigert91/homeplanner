import { Button } from "@/components/ui/button";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/_protected/tasks")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      ...convexQuery(api.tasks.getTasks, {}),
    });
  },
  pendingComponent: () => <div>Loading...</div>,
  component: RouteComponent,
});

const Task = ({ task, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        y: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 },
        layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 },
      }}
      className="p-4 border rounded shadow"
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-600">Task ID: {task._id}</p>
      <Button onClick={() => onDelete(task._id)}>Delete Task</Button>
    </motion.div>
  );
};

function RouteComponent() {
  const tasksQuery = useSuspenseQuery({
    ...convexQuery(api.tasks.getTasks, {}),
  });

  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.tasks.deleteTask),
  });

  const tasks = tasksQuery.data;

  const handleDelete = (taskId) => {
    console.log("Deleting task with ID:", taskId);
    mutate({ taskId });
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <motion.div layout className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <Task key={task._id} task={task} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
