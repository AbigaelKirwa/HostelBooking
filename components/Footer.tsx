import Email from "@/components/images/social_media/Email.png";
import Facebook from "@/components/images/social_media/Facebook.png";
import Share from "@/components/images/social_media/Share.png";
import Image from "next/image";
import { Input } from "./ui/input";

const contacts = [
  {
    id: 1,
    heading: "Our Contacts",
    link_one: "admin@gmail.com",
    link_two: "P.O.Box 1234-5678",
    link_three: "Nairobi, Kenya",
  },
  {
    id: 2,
    heading: "Links",
    link_one: "Home",
    link_two: "Accomodations",
    link_three: "FAQs",
  },
  {
    id: 3,
    heading: "Updates",
    link_one: "launches",
    link_two: "schedule",
    link_three: "announcements",
  },
];

export default function () {
  return (
    <div id="footer" className="bg-gradient-to-r from-[#180F24] via-[#264A5A] to-[#1E1846] px-20 py-10">
      <div id="overall" className="flex flex-row justify-between max-md:flex-col max-md:justify-center max-md:items-center max-md:text-center max-md:gap-y-16">
        <div id="contacts" className="grid grid-cols-3 gap-x-20 text-white max-lg:grid-cols-2 max-lg:gap-y-10 max-md:grid-cols-1 max-md:gap-y-10 max-md:gap-x-0">
          {contacts.map((contact: any) => (
            <div key={contact.id} className="flex flex-col gap-y-8 max-md:gap-y-4">
              <h1 className="font-semibold text-lg">{contact.heading}</h1>
              <p className="text-sm">{contact.link_one}</p>
              <p className="text-sm">{contact.link_two}</p>
              <p className="text-sm">{contact.link_three}</p>
            </div>
          ))}
        </div>
        <div id="social_media" className="flex flex-col gap-y-10 items-center justify-center float-right" >
            <div>
                <Input type="text" placeholder="search" className="bg-transparent border-solid border-2 rounded-md text-white placeholder-white px-9 py-6" />
            </div>
            <div className="flex gap-x-10 right-0 justify-center items-center">
                <Image src={Share} alt="social media" className="w-6 h-6" />
                <Image src={Facebook} alt="social media" className="w-6 h-6" />
                <Image src={Email} alt="social media" className="w-6 h-6" />
            </div>
        </div>
      </div>
    </div>
  );
}
