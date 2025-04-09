import { Household } from "convex/household";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { FC, useState } from "react";
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

const householdSchema = z.object({
  name: z
    .string()
    .min(1, "Household name is required")
    .max(50, "Household name must be less than 50 characters"),
});

type HouseholdCreatorProps = {};

export const HouseholdCreator: FC<HouseholdCreatorProps> = () => {
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.household.createHousehold),
  });

  const form = useForm<z.infer<typeof householdSchema>>({
    resolver: zodResolver(householdSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof householdSchema>) => {
    console.log("Household name:", data.name);
    mutate(data, {
      onSuccess: (data) => {
        console.log("Household created successfully:", data);
      },
    });
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-600">Create a Household</h2>
      <p className="text-gray-600">Create a new household to get started.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm mt-4 space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Household Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-600"
                    placeholder="Household Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
