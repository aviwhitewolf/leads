"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/dashboard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStore } from "zustand";
import { useSidebar } from "@/hooks/use-sidebar";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Settings() {
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
    
      <TooltipProvider>
        <div className="flex gap-6 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-hover-open"
                  onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                  checked={settings.isHoverOpen}
                />
                <Label htmlFor="is-hover-open">Hover Open</Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>When hovering on the sidebar in mini state, it will open</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="disable-sidebar"
                  onCheckedChange={(x) => setSettings({ disabled: x })}
                  checked={settings.disabled}
                />
                <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide sidebar</p>
            </TooltipContent>
          </Tooltip>

          

        </div>
      </TooltipProvider>
    </ContentLayout>
  );
}
