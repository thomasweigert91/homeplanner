import { useAuth } from "@clerk/tanstack-start";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useConvexMutation } from "@convex-dev/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const registerProfileSchema = z.object({
  username: z
    .string()
    .min(1, "Der Benutzername wird benötigt")
    .max(50, "Der Benutzername darf nicht länger als 50 Zeichen sein"),
});

export const Route = createFileRoute("/register-profile")({
  beforeLoad: ({ context }) => {
    // Stellen Sie sicher, dass der Benutzer angemeldet ist
    if (!context.userId) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RegisterProfile,
});

function RegisterProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerProfileSchema>>({
    resolver: zodResolver(registerProfileSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate: createUser } = useMutation({
    mutationFn: useConvexMutation(api.helper.createUser),
    onSuccess: () => {
      toast.success("Profil erfolgreich erstellt!");
      setIsLoading(false);
      throw redirect({
        to: "/household",
        replace: true,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error("Fehler beim Erstellen des Profils:", error);
        toast.error(
          "Fehler beim Erstellen des Profils. Bitte versuche es erneut."
        );
      }
    },
  });

  const handleSubmit = async (data: z.infer<typeof registerProfileSchema>) => {
    if (!data.username.trim()) {
      toast.error("Bitte gib einen Benutzernamen ein.");
      return;
    }

    setIsLoading(true);

    createUser({
      name: data.username,
    });

    // Kein Redirect hier, da er bereits im onSuccess-Callback stattfindet
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Dein Profil einrichten
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benutzername</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gib deinen Benutzernamen ein"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Dein Benutzername wird in der App angezeigt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Wird gespeichert..." : "Profil speichern"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
