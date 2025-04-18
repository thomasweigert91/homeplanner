import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/household/join")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/household/join"!</div>;
}
