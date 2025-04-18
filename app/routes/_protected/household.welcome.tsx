import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { useConvexQuery } from "@convex-dev/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { LucideHouse, UserPlus } from "lucide-react";

export const Route = createFileRoute("/_protected/household/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useAuth();
  const user = useConvexQuery(api.helper.getUserData, { userId: userId! });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {user ? `Willkommen, ${user.name}!` : "Willkommen!"}
      </h1>

      <div className="max-w-xl mx-auto">
        <p className="text-center mb-8 text-gray-600">
          Um HomePlanner nutzen zu können, benötigst du einen Haushalt. Du
          kannst entweder einen neuen Haushalt erstellen oder einem bestehenden
          Haushalt beitreten.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideHouse size={24} />
                Neuen Haushalt anlegen
              </CardTitle>
              <CardDescription>
                Erstelle einen eigenen Haushalt und lade andere ein
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500">
                Perfekt für Familien und Wohngemeinschaften. Du kannst später
                weitere Mitglieder einladen.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/household/create">Haushalt erstellen</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus size={24} />
                Einem Haushalt beitreten
              </CardTitle>
              <CardDescription>
                Tritt einem bestehenden Haushalt bei
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500">
                Du hast eine Einladung erhalten? Tritt dem Haushalt bei, um
                Aufgaben und Termine zu teilen.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/household/join">Haushalt beitreten</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
