import { SignedIn, SignIn, SignUp, SignUpButton } from "@clerk/tanstack-start";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ProfileForm } from "@/components/profile-form";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: "/login" });
    }

    return context.userId;
  },
});
