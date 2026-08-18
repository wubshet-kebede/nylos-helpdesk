import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-slate-950">
      <Navbar />

      <main className="w-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
