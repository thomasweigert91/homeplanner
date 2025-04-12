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
import { ChangeEventHandler, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Calendar1 } from "lucide-react";

import { setHours, setMinutes } from "date-fns";

type TaskCreatorProps = {};

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export const TaskCreator: FC<TaskCreatorProps> = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string>();

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!date) {
      console.log("New selected date:", e.target.value);
      setTimeValue(e.target.value);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(date, minutes), hours);
    console.log("New selected date:", newSelectedDate);

    setDate(newSelectedDate);
    setTimeValue(e.target.value);
  };
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
    const { title, description } = data;
    if (!date) {
      console.error("Date is required");
      return;
    }
    console.log({
      title,
      description,
      dueDate: new Date(date).toISOString(),
    });
    mutate(
      { title, description, dueDate: new Date(date).toISOString() },
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
            <DialogTitle className="text-gray-600">Create a task</DialogTitle>
            <DialogDescription>
              Fill in the details of your task below and click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-400">
                      Task Title
                    </Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-400">
                      Description
                    </Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="dueDate" className="text-gray-400">
                      Due Date
                    </Label>
                    <Popover>
                      <PopoverTrigger className="flex items-center w-full p-2 border rounded-md cursor-pointer gap-2">
                        <Calendar1 className="text-gray-400" />

                        {field.value ? (
                          <span className="text-gray-600 ">
                            {field.value.toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">Select date</span>
                        )}
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          components={{
                            Footer: () => (
                              <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                                <span className="text-gray-600 mx-auto">
                                  {date
                                    ? date?.toLocaleDateString()
                                    : "Select date"}
                                </span>
                                <input
                                  type="time"
                                  value={timeValue}
                                  onChange={handleTimeChange}
                                  className=" p-2 rounded-md"
                                />
                              </div>
                            ),
                          }}
                          selected={date}
                          onSelect={(date) => {
                            setDate(date);
                            field.onChange(date);
                          }}
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
