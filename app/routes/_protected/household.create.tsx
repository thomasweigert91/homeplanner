import { HouseholdCreator } from "@/components/household-creator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/household/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Neuen Haushalt erstellen
      </h1>
      <div className="max-w-md mx-auto">
        <HouseholdCreator />
      </div>
    </div>
  );
}
