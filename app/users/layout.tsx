import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
