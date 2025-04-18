import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getUserData = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return user;
  },
});

export const createUser = mutation({
  args: {
    userId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    createdAt: v.optional(v.string()),
  },
  handler: async ({ db }, { userId, name }) => {
    await db
      .insert("users", {
        userId,
        name,
        createdAt: new Date().toISOString(),
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
