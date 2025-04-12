import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/mealplan")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/mealplan"!</div>;
}
