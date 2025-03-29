import { Route, Routes } from "react-router";
import { Home, CreateCampaign, CampaignDetails, Profile } from "./pages";
import { Navbar, Sidebar } from "./components";

export function App() {
  return (
    <main className="p-4 min-h-[100dvh] flex bg-[#13131a] text-white">
      <aside className="mr-10 max-sm:hidden">
        <Sidebar />
      </aside>
      <div className="flex-1 sm:max-w-[85%] max-w-full sm:mx-auto">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </main>
  );
}
