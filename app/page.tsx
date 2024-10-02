import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import ButtonPink from "@/components/Button";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div id="home">
        <div className="pt-40 px-10 w-1/2 max-md:w-full">
          <h1 className="font-bold text-6xl text-[#1E1846] max-md:text-5xl">Hostel Connect</h1>
          <p className="w-3/4 text-sm text-justify font-semibold text-gray-900 mt-5 leading-loose">
            Find your perfect hostel with ease. Browse, book, 
            and stay - everything in one place. If you are a student, 
            we've got the ideal space for you. Choose from a long list of 
            options. Start your journey today!
          </p>
          <div className="mt-5">
            <Link href="/accomodation">
              <ButtonPink paddingY="2em" paddingX="4em">Find Accomodation</ButtonPink>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
