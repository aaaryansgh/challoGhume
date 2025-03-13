import Image from "next/image";
import Navbar from "../components/navbar";
import Hero from "@/components/hero";
import DestinationSearch from "@/components/destinationSearch";
import FeaturedDestination from "@/components/featuredDestination";
import Travelpackage from "@/components/travelpackage";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedDestination />
      <Travelpackage />
    </div>
  );
}