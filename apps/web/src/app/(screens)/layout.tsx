import DashboardLayout from "@/components/dashboard/dashboard";

export default function ScreensLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}