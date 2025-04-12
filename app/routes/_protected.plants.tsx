import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/plants")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/plants"!</div>;
}
