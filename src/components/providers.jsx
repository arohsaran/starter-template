"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { pb, getAccountKey } from "@/pocketbase";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

// Keep one request cache for the app, rather than making a new cache on each render.
export function Providers({ children }) {
  const [queryClient] = useState(function createQueryClient() {
    return new QueryClient();
  });

  useEffect(
    function watchAccount() {
      let account = getAccountKey();
      return pb.authStore.onChange(function handleAccountChange() {
        const nextAccount = getAccountKey();
        if (nextAccount !== account) {
          // Do not leave the previous account's data in the shared cache.
          queryClient.clear();
          account = nextAccount;
        }
      });
    },
    [queryClient],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
