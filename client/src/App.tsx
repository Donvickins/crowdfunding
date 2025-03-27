import { Route, Routes } from "react-router";
import { Home, CreateCampaign, CampaignDetails, Profile } from "./pages";
import { Navbar, Sidebar } from "./components";

export function App() {
  return (
    <main className="p-4 min-h-[100dvh] flex bg-[#13131a] text-white">
      <aside className="">
        <Sidebar />
      </aside>
      <div className="">
        <nav>
          <Navbar />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </main>
  );
}
