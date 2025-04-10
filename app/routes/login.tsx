import { SignIn, SignInButton, useAuth } from "@clerk/tanstack-start";
import {
  createFileRoute,
  redirect as redirectFn,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const redirect = search.redirect as string | undefined;

    return { redirect };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    throw redirectFn({
      to: redirect || "/dashboard",
    });
  }

  return (
    <div>
      <SignIn fallbackRedirectUrl={redirect || "/dashboard"} />
    </div>
  );
}
