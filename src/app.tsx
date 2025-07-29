import { createRouter, RouterProvider } from "@tanstack/react-router";
import {
  createContext,
  client as queryClient,
  TanstackQueryProvider,
} from "./lib/providers";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: createContext({ queryClient }),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  );
}
