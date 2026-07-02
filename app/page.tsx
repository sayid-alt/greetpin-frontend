import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CurrentEventCard from "./components/CurrentEventCard";
import MetricsGrid from "./components/MetricsGrid";
import NotificationsSidebar from "./components/NotificationsSidebar";
import UpcomingEvents from "./components/upcoming-events/UpcomingEvents";
import FloatingActionButton from "./components/FloatingActionButton";
import NoOngoingEventCard from "./components/NoOngoingEventCard";
import NoMetricsGrid from "./components/NoMetricsGrid";
import NoUpcomingEvents from "./components/upcoming-events/NoUpcomingEvents";
import NoNotificationsSidebar from "./components/NoNotificationSidebar";
import { eventService } from "@/lib/api/dashboard";


export default async function Dashboard() {
  const upcomingEventsData = await eventService("/upcoming");
  console.log("Fetched Events:", upcomingEventsData);

  return (
    <>
      <Sidebar />
      <div className="ml-[280px] flex-1 flex flex-col">
        <Header />
        
        <main className="p-8 grid grid-cols-12 gap-6">
          {/* Main Column Left */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <NoOngoingEventCard />
            {/* <CurrentEventCard /> */}
            {/* <MetricsGrid /> */}
            <NoMetricsGrid />
          </div>

          {/* Sidebar Column Right */}
          <div className="col-span-12 lg:col-span-4">
            {/* <NotificationsSidebar /> */}
            <NoNotificationsSidebar />
          </div>

          {/* Bottom Table Row */}
          <div className="col-span-12">
            {
              upcomingEventsData ? <UpcomingEvents /> : <NoUpcomingEvents />
            }
          </div>
        </main>
      </div>
      <FloatingActionButton />
    </>
  );
}