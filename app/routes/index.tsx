// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-start";
import { useHouseholds } from "@/hooks/useHousehold";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { households } = useHouseholds();

  return (
    <div>
      <div>
        <h1>Index Route</h1>
        <SignedIn>
          <p>You are signed in</p>
          <SignOutButton />
          {!households || households.length === 0 ? (
            <p>No households found</p>
          ) : (
            households?.map((household) => (
              <p key={household._id}>{household.name}</p>
            ))
          )}
        </SignedIn>
        <SignedOut>
          <p>You are signed out</p>
          <SignInButton />
        </SignedOut>
        <Link to="/dashboard">Route to protected</Link>
      </div>
    </div>
  );
}
