import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  households: defineTable({
    name: v.string(),
    createdAt: v.string(),
    createdBy: v.id("users"),
  }),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    householdId: v.id("households"),
    assignedTo: v.optional(v.id("users")),
    done: v.boolean(),
    dueDate: v.optional(v.string()),
    priority: v.optional(v.number()), // z.B. 1 (hoch) bis 5 (niedrig)
    createdAt: v.string(),
    updatedAt: v.string(),
    createdBy: v.id("users"),
    updatedBy: v.id("users"),
  }),

  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.string(),
    profileImageUrl: v.optional(v.string()),
    createdAt: v.string(),
    connectedHousehold: v.optional(v.id("households")),
  }),
});
