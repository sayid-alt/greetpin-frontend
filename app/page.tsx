import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CurrentEventCard from "./components/CurrentEventCard";
import NotificationsSidebar from "./components/NotificationsSidebar";
import UpcomingEvents from "./components/upcoming-events/UpcomingEvents";
import FloatingActionButton from "./components/FloatingActionButton";
import NoOngoingEventCard from "./components/NoOngoingEventCard";
// import NoMetricsGrid from "./components/NoMetricsGrid";
import NoUpcomingEvents from "./components/upcoming-events/NoUpcomingEvents";
import NoNotificationsSidebar from "./components/NoNotificationSidebar";

import { getEvents } from "@/lib/services/dashboard";
import { EmptyNextEventCard, NextEventCard } from "./components/metrics-grid/NextEventCard";
import { EmptyNextImportantCard, NextImportantCard } from "./components/metrics-grid/NextImportantCard";


export default async function Dashboard() {
  const upcomingEventsResponse = await getEvents('/upcoming');
  console.log('original',upcomingEventsResponse);
  return (
    <>
      <Sidebar />
      <div className="ml-[280px] flex-1 flex flex-col">
        <Header />
        
        <main className="p-8 grid grid-cols-12 gap-6">
          {/* Main Column Left */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Ongoing Banner */}
            {/* <CurrentEventCard /> */}
            <NoOngoingEventCard />

            {/* Metric grid section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Next event card */}
              {
                upcomingEventsResponse == null ? 
                  <EmptyNextEventCard /> :
                  <NextEventCard response={upcomingEventsResponse} />
              }
              
              {/* Important next event card */}
              {
                upcomingEventsResponse == null ?
                  <EmptyNextImportantCard /> :
                  <NextImportantCard response={upcomingEventsResponse} />
              }
              
            </div>
          </div>

          {/* Sidebar Column Right */}
          <div className="col-span-12 lg:col-span-4">
            {/* <NotificationsSidebar /> */}
            <NoNotificationsSidebar />
          </div>

          {/* Bottom Table Row */}
          <div className="col-span-12">
            {
              upcomingEventsResponse == null ? 
                <NoUpcomingEvents /> :
                <UpcomingEvents 
                  response={upcomingEventsResponse}
                /> 
            }
          </div>
        </main>
      </div>
      <FloatingActionButton />
    </>
  );
}