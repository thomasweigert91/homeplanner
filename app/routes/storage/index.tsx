import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/storage/")({
  component: RouteComponent,
  loader: async () => {
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      data: "Hello from the loader!",
      error: null,
      status: 200,
    };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <div>{data}</div>;
}
