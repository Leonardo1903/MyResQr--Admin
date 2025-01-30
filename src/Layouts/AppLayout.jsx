import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
