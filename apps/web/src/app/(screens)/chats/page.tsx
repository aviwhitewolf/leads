"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "zustand";
import { useSidebar } from "@/hooks/use-sidebar";
import { ContentLayout } from "@/components/dashboard/content-layout";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';

export default function Chats() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  const privateData = useQuery(orpc.privateData.queryOptions());

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
   <ContentLayout title="Chats">
    
      
        <div className="flex gap-6 mt-6">
        


        </div>
      
    </ContentLayout>
  );
}
