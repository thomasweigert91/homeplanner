import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { h } from "node_modules/@clerk/clerk-react/dist/useAuth-Do-ds1OD.mjs";
import { getUserData } from "./helper";

export type Household = Doc<"households">;

export const getAllHouseholds = query({
  args: {},
  handler: async ({ db }) => {
    const households = await db.query("households").collect();
    return households;
  },
});

export const getUserHoushold = query({
  args: { householdId: v.optional(v.string()), userId: v.optional(v.string()) },
  handler: async (
    { db },
    { householdId, userId }
  ): Promise<Household | null> => {
    // Wenn eine Haushalt-ID angegeben ist, diese direkt abfragen
    if (householdId) {
      const household = await db
        .query("households")
        .filter((q) => q.eq(q.field("_id"), householdId))
        .first();

      if (!household) {
        throw new Error("Household not found");
      }

      console.log("Household found by ID:", household);
      return household;
    }

    // Wenn keine Haushalt-ID angegeben ist, aber eine Benutzer-ID vorhanden ist
    // Benutzer-Haushalt über die Benutzer-Tabelle abfragen
    if (userId) {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first();

      if (!user || !user.householdId) {
        console.log("No household found for user:", userId);
        return null;
      }

      const household = await db.get(user.householdId);
      if (!household) {
        console.log("Referenced household not found:", user.householdId);
        return null;
      }

      console.log("Household found by user ID:", household);
      return household;
    }

    throw new Error("Either householdId or userId must be provided");
  },
});

export const createHousehold = mutation({
  args: {
    name: v.string(),
    userId: v.string(),
  },
  handler: async ({ db, runQuery, auth }, { name, userId }) => {
    const userIds = await auth.getUserIdentity();
    console.log(userIds);

    const household = await db.insert("households", {
      name: name,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    });

    // Benutzer aktualisieren, um die Haushalt-ID zuzuweisen
    const user = await runQuery(api.helper.getUserData, { userId });
    if (!user) throw new Error("User not found");

    // Benutzer mit der Haushalt-ID aktualisieren
    await db.patch(user._id, {
      householdId: household,
    });

    return household;
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
