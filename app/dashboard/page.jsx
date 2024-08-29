'use client'
import CardUser from './card/CardUser';
import { useSession } from "next-auth/react";
import Welcome from "../components/welcome/Welcome";
import NavbarApp from '../components/navbarApp/NavbarApp';
const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
      return <p>Loading...</p>;
  }

  return (
    <>
    <NavbarApp />
    <div className="flex justify-center items-center p-2 w-full h-[90vh]">
          <Welcome session={session} />
          <CardUser session={session}/>
          <div className=' w-[250px] absolute text-right right-10 bottom-1 text-6xl italic font-bold text-wrap'>
                Find your soulmate
          </div>
        </div>

    </>
   
  );
};

export default Dashboard;
