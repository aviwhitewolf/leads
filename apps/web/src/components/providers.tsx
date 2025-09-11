"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/orpc";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
			<Toaster richColors />
		</>
	);
}
