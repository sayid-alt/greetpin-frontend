import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FloatingActionButton from "../components/FloatingActionButton";
import Dashboard from "./dashboard/page";

export default async function Home() {  
  return (
    <>
      <Sidebar />
      <div className="ml-[280px] flex-1 flex flex-col">
        <Header />
        <Dashboard />
      </div>
      <FloatingActionButton />
    </>
  );
}