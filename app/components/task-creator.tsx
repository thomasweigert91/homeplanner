"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

type TaskCreatorProps = {};

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export const TaskCreator: FC<TaskCreatorProps> = () => {
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.tasks.createTask),
  });

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    const { title, description, dueDate } = data;
    mutate(
      { title, description, dueDate },
      {
        onSuccess: (task) => {
          console.log("Task has been created.", task);
        },
        onError: (error) => {
          console.error("Error creating task:", error);
        },
      }
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-600">Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <div>
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter task title"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      {...field}
                      id="description"
                      placeholder="Enter task description"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Popover>
                      <PopoverTrigger>Open</PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(new Date(date));
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
