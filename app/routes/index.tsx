// app/routes/index.tsx
import * as fs from "node:fs";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-start";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { userId } = context;

    if (userId) {
      throw redirect({ to: "/household" });
    }

    throw redirect({ to: "/login" });
  },
  component: Home,
});

function Home() {
  return <></>;
}
