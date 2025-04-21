import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export type Household = Doc<"households">;

export const getUserHoushold = query({
  args: {},
  handler: async ({ db, auth, runQuery }): Promise<Household | null> => {
    // Get the user identity from the auth context
    const identity = await auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    // Get current user via the helper function
    const currentUser = await runQuery(api.helper.getCurrentUser);

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    // Check if the user is already connected to a household
    const connectedHousehold = await db
      .query("householdMembers")
      .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
      .first();

    if (!connectedHousehold) {
      return null; // No household found for the user
    }

    // Fetch the household details using the householdId from the connectedHousehold
    const household = await db
      .query("households")
      .filter((q) => q.eq(q.field("_id"), connectedHousehold.householdId))
      .first();

    return household;
  },
});

export const createHousehold = mutation({
  args: {
    name: v.string(),
  },
  handler: async ({ db, auth, runQuery }, { name }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }
    const currentUser = await runQuery(api.helper.getCurrentUser);
    const currentDate = new Date().toISOString();

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    const householdId = await db.insert("households", {
      createdAt: currentDate,
      createdBy: currentUser._id,
      name,
    });

    if (!householdId) {
      throw new Error("Error creating household");
    }

    await db.insert("householdMembers", {
      householdId: householdId,
      userId: currentUser._id,
      role: "owner",
      joinedAt: currentDate,
    });

    return householdId;
  },
});

export const checkAuth = query({
  args: {},
  handler: async ({ auth }) => {
    const identity = await auth.getUserIdentity();
    return {
      hasIdentity: !!identity,
      identity,
    };
  },
});
