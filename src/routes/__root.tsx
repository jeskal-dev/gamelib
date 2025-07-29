import type { ApplicationContext } from "@/lib/providers";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Root = createRootRouteWithContext<ApplicationContext>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
