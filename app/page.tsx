import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CurrentEventCard from "./components/CurrentEventCard";
import MetricsGrid from "./components/MetricsGrid";
import NotificationsSidebar from "./components/NotificationsSidebar";
import UpcomingEvents from "./components/UpcomingEvents";
import FloatingActionButton from "./components/FloatingActionButton";



export default async function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="ml-[280px] flex-1 flex flex-col">
        <Header />
        
        <main className="p-8 grid grid-cols-12 gap-6">
          {/* Main Column Left */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <CurrentEventCard />
            <MetricsGrid />
          </div>

          {/* Sidebar Column Right */}
          <div className="col-span-12 lg:col-span-4">
            <NotificationsSidebar />
          </div>

          {/* Bottom Table Row */}
          <div className="col-span-12">
            <UpcomingEvents />
          </div>
        </main>
      </div>
      <FloatingActionButton />
    </>
  );
}