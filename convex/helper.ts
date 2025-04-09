import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const getUserFromClerkId = query({
  args: { clerkId: v.string() },
  handler: async ({ db }, { clerkId }) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .first();
    return user;
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.string(),
    profileImageUrl: v.optional(v.string()),
    createdAt: v.string(),
  },
  handler: async ({ db }, { clerkId, email, name, profileImageUrl }) => {
    const userId = await db.insert("users", {
      clerkId,
      email,
      name,
      profileImageUrl,
      createdAt: new Date().toISOString(),
    });

    return userId;
  },
});

export const isHouseholdNameTaken = internalQuery({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    const household = await db
      .query("households")
      .filter((q) => q.eq(q.field("name"), name))
      .first();
    return household !== null;
  },
});
