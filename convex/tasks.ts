import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async ({ auth, db, runQuery }, { title, description, dueDate }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const clerkId = identity.subject;
    const user = await runQuery(api.helper.getUserFromClerkId, {
      clerkId: clerkId,
    });

    if (!user) throw new Error("User not found");

    const task = await db.insert("tasks", {
      title,
      description,
      householdId: user.connectedHousehold,
      done: false,
      createdAt: new Date().toISOString(),
      createdBy: user._id,
      dueDate,
      updatedAt: new Date().toISOString(),
      updatedBy: user._id,
    });

    return task;
  },
});

export const getTasks = query({
  args: {},
  handler: async ({ db, auth, runQuery }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const clerkId = identity.subject;
    const user = await runQuery(api.helper.getUserFromClerkId, {
      clerkId: clerkId,
    });

    if (!user) throw new Error("User not found");

    const tasks = await db
      .query("tasks")
      .filter((q) => q.eq(q.field("householdId"), user.connectedHousehold))
      .collect();

    return tasks;
  },
});
