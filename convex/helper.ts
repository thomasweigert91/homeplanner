import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async ({ db, auth }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }
    const clerkId = identity.subject;

    const user = await db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();
    return user;
  },
});

export const createUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    profileImage: v.optional(v.string()),
  },
  handler: async ({ db, auth }, { name }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }
    const clerkId = identity.subject;
    const currentDate = new Date().toISOString();

    await db
      .insert("users", {
        clerkId,
        name,
        createdAt: currentDate,
      })
      .then((user) => {
        console.log("User created successfully:", user);
        return user;
      })
      .catch((error) => {
        throw new Error("Error creating user: " + error.message);
      });
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
