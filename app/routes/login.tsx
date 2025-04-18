import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/tanstack-start";
import {
  createFileRoute,
  redirect as redirectFn,
} from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    const { userId } = context;
    if (userId) {
      throw redirectFn({ to: "/household" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Anmelden</h1>
        <Button asChild variant={"default"} className="w-full">
          <SignInButton fallbackRedirectUrl={"/household"} />
        </Button>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Neu hier?</h1>
        <div className="flex justify-center">
          <Button asChild variant={"default"} className="w-full">
            <SignUpButton forceRedirectUrl="/register-profile">
              Registrieren
            </SignUpButton>
          </Button>
        </div>
      </div>
    </div>
  );
}
