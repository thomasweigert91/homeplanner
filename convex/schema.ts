import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  households: defineTable({
    name: v.string(),
    createdAt: v.string(),
    createdBy: v.string(),
  }),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    householdId: v.id("households"),
    assignedTo: v.optional(v.id("users")),
    done: v.boolean(),
    dueDate: v.optional(v.string()),
    priority: v.optional(v.number()),
    updatedAt: v.string(),
    createdBy: v.string(),
    updatedBy: v.string(),
  }),

  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    householdId: v.optional(v.id("households")),
  }).index("by_clerkId", ["clerkId"]),

  householdMembers: defineTable({
    userId: v.id("users"),
    householdId: v.id("households"),
    role: v.string(), // "owner", "admin", "member"
    joinedAt: v.string(),
    invitedBy: v.optional(v.id("users")),
  })
    .index("by_userId", ["userId"])
    .index("by_householdId", ["householdId"]),
});
