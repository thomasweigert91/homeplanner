import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { api } from "convex/_generated/api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { redirect } from "@tanstack/react-router";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type ProfileFormProps = {};

export const ProfileForm: FC<ProfileFormProps> = () => {
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.helper.createUser),
  });
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          toast("Profile updated successfully.");
          throw redirect({ to: "/household" });
        },
        onError: (error) => {
          toast.error(`Error updating profile: ${error.message}`);
        },
      }
    );
  };

  return (
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
