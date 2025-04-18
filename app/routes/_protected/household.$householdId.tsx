import { convexQuery } from "@convex-dev/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tasks } from "@/components/tasks";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_protected/household/$householdId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { householdId } = params;

    return context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["household", householdId],
        queryFn: async () => {
          return convexQuery(api.household.getUserHoushold, { householdId });
        },
      })
    );
  },
});

function RouteComponent() {
  const householdId = Route.useParams().householdId;
  const { data: household } = useSuspenseQuery(
    queryOptions({
      queryKey: ["household", householdId],
      queryFn: () =>
        convexQuery(api.household.getUserHoushold, { householdId }),
    })
  );

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Aktualisiere Datum jede Minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!household) {
    return <div>Haushalt wird geladen...</div>;
  }

  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(currentDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          {/* <h1 className="text-3xl font-bold">{household.name}</h1> */}
          <p className="text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Aufgaben</CardTitle>
          </CardHeader>
          {/* <CardContent>
            <Tasks householdId={householdId} />
          </CardContent> */}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kalender</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Kalender-Funktion kommt bald...</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Einkaufsliste</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Einkaufsliste-Funktion kommt bald...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notizen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Notizen-Funktion kommt bald...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mitglieder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mitglieder-Übersicht kommt bald...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
