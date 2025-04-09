import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export type Household = Doc<"households">;

export const getAllHouseholds = query({
  args: {},
  handler: async ({ db }) => {
    const households = await db.query("households").collect();
    return households;
  },
});

export const getUserHousholds = query({
  args: {},
  handler: async ({ auth, db, runQuery }): Promise<Household[]> => {
    const identity = await auth.getUserIdentity();

    if (!identity) throw new Error("User not authenticated");
    const clerkId = identity.subject;

    const user = await runQuery(internal.helper.getUserFromClerkId, {
      clerkId,
    });

    if (!user) throw new Error("User not found");

    const households = await db.query("households").collect();

    const userHouseholds = households.filter((household) => {
      return household.members.some((member) => {
        return member.userId === user._id;
      });
    });

    return userHouseholds;
  },
});

export const createHousehold = mutation({
  args: {
    name: v.string(),
  },
  handler: async ({ auth, db, runQuery }, { name }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const clerkId = identity.subject;
    const user = await runQuery(api.helper.getUserFromClerkId, {
      clerkId: clerkId,
    });

    if (!user) throw new Error("User not found");

    const household = await db.insert("households", {
      name: name,
      members: [
        {
          userId: user._id,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
        },
      ],
      createdAt: new Date().toISOString(),
      createdBy: user._id,
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
