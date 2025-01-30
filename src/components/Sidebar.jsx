import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Pending Requests",
    url: "/dashboard/pending-requests",
    icon: Inbox,
  },
  {
    title: "PIN Requests",
    url: "/dashboard/pin-requests",
    icon: Calendar,
  },
  {
    title: "Create Plan",
    url: "/dashboard/create-plan",
    icon: Search,
  },
  {
    title: "Generate PINs",
    url: "/dashboard/generate-pins",
    icon: Settings,
  },
];

export default function SidebarComponent() {
  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-black">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
