import { SignIn, SignInButton } from "@clerk/tanstack-start";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const redirect = search.redirect as string | undefined;

    return { redirect };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  console.log("redirect", redirect);
  return (
    <div>
      <SignIn fallbackRedirectUrl={redirect || "/"} />
    </div>
  );
}
