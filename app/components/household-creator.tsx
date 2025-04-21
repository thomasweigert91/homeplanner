import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { redirect } from "@tanstack/react-router";
import { useAuth } from "@clerk/tanstack-start";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const householdSchema = z.object({
  name: z
    .string()
    .min(1, "Der Haushaltname wird benötigt")
    .max(50, "Der Haushaltname darf nicht länger als 50 Zeichen sein"),
});

type HouseholdCreatorProps = {};

export const HouseholdCreator: FC<HouseholdCreatorProps> = () => {
  const { mutate: createHousehold } = useMutation({
    mutationFn: useConvexMutation(api.household.createHousehold),
  });

  const form = useForm<z.infer<typeof householdSchema>>({
    resolver: zodResolver(householdSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof householdSchema>) => {
    createHousehold(
      { name: data.name },
      {
        onSuccess: (data) => {
          toast("Haushalt wurde erfolgreich erstellt.", {
            style: {},
          });
          throw redirect({
            to: "/household/$householdId",
            params: { householdId: data },
          });
        },
        onError: (error) => {
          toast.error("Fehler beim Erstellen des Haushalts: " + error);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gib deinem Haushalt einen Namen</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Haushaltname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="z.B. Meine WG, Familie Müller..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Der Name wird allen Haushaltsmitgliedern angezeigt
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              Haushalt erstellen
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
