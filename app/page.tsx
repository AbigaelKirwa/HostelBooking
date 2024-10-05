'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import ButtonPink from "@/components/Button";
import HomeIcon from "@/components/images/icons/home_icon.png"
import UserIcon from "@/components/images/icons/user_icon.png"
import EducationIcon from "@/components/images/icons/education_icon.png"
import AboutImage from "@/components/images/about.svg"
import TestimonialOne from "@/components/images/testimonial1.png"
import TestimonialTwo from "@/components/images/testimonial2.png"
import TestimonialThree from "@/components/images/testimonial3.png"
import Footer from "@/components/Footer";

const counts=[
  {
    id:1,
    image:HomeIcon,
    number:'50+',
    name:'Hostel Institutions'
  },
  {
    id:2,
    image:UserIcon,
    number:'1000+',
    name:'Students served'
  },
  {
    id:3,
    image:EducationIcon,
    number:'30+',
    name:'Universities covered'
  }
]

const testimonials=[
  {
    id:1,
    image:TestimonialOne,
    name:'Alfred Rotich',
    paragraph:'This platform completely changed the way I looked for a hostel. I was able to compare different options near my campus, all with detailed descriptions and reviews. The booking process was incredibly straightforward, and the team was available to answer any questions I had about the process.'
  },
  {
    id:2,
    image:TestimonialTwo,
    name:'Jessica Too',
    paragraph:'I’ve used this platform twice throughout my university life, and it has always exceeded my expectations. The hostels listed are well-maintained, and I felt confident knowing they were verified. The best part was the responsive customer service team, who helped me navigate the booking process.'
  },
  {
    id:3,
    image:TestimonialThree,
    name:'Lissa Chebet',
    paragraph:'As a first-year student, I was overwhelmed by the idea of finding accommodation. This website made it so much easier by giving me a variety of affordable, student-friendly hostels to choose from. The detailed information, including pictures and room features, made my decision easy.'
  }
]

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div id="home">
        <div className="pt-40 px-10 w-1/2 max-lg:w-3/4 max-sm:w-full">
          <h1 className="font-bold text-6xl text-[#1E1846] max-lg:text-5xl">Hostel Connect</h1>
          <p className="w-3/4 text-sm text-justify font-semibold text-gray-900 mt-5 leading-loose">
            Find your perfect hostel with ease. Browse, book, 
            and stay - everything in one place. If you are a student, 
            we've got the ideal space for you. Choose from a long list of 
            options. Start your journey today!
          </p>
          <div className="mt-5">
            <Link href="/accomodations">
              <ButtonPink paddingY="2em" paddingX="4em">Find Accomodation</ButtonPink>
            </Link>
          </div>
        </div>
      </div>
      <div id="counts" className="flex justify-center py-20">
        <div className="grid grid-cols-3 gap-24 max-md:grid-cols-1 max-md:gap-10 ">
          {counts.map((count:any) => (
            <div id="individual" key={count.id} style={{ boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.2)' }} className="bg-[#E7E7E7] w-56 rounded-2xl py-9 gap-3 flex flex-col items-center justify-center max-md:w-72 max-md:py-12">
              <Image src={count.image} alt="icons" className="w-10"/>
              <h4 className="text-4xl font-semibold text-[#E24848]">{count.number}</h4>
              <p className="font-semibold text-[#2E2D2D]">{count.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="about" className="px-20 flex justify-center items-center max-md:flex-col max-md:px-5 max-md:gap-5">
        <div id="image" className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
          <Image src={AboutImage} alt="confused"/>
        </div>
        <div id="words" className="w-1/2 flex flex-col justify-center items-center px-10 text-justify gap-10 max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:gap-5">
          <h2 className="font-bold text-6xl text-[#1E1846] max-lg:text-5xl max-md:text-4xl">Why Choose Us?</h2>
          <p className="text-sm leading-loose text-[#302F2F]">
            We are committed to making the search for student accommodation easy and 
            stress-free. Our platform offers a wide range of verified hostels, 
            tailored specifically for students' needs. With a focus on convenience, 
            transparency, and 24/7 support, we ensure a smooth and reliable booking 
            process. Thousands of students have already found their ideal living 
            space with us—now it's your turn!
            </p>
        </div>
      </div>
      <div id="testimonials" className="flex flex-col justify-center py-20">
        <h2 className="font-bold text-center text-5xl text-[#1E1846] max-lg:text-5xl max-md:text-3xl max-md:px-10">What Other Students had to say</h2>
        <div className="grid grid-cols-3 gap-24 mt-20 px-20 max-md:grid-cols-1 max-md:gap-10 ">
          {testimonials.map((testimonial:any) => (
            <div id="individual" key={testimonial.id} className="gap-3 flex flex-col items-center justify-center">
              {testimonial.id==2 ? (
                <>
                  <Image src={testimonial.image} alt="icons" className="w-48"/>
                  <h4 className="text-xl font-semibold text-[#1E1846] -mt-2">{testimonial.name}</h4>
                </>
                ):(
                  <>
                    <Image src={testimonial.image} alt="icons" className="w-40"/>
                    <h4 className="text-xl font-semibold text-[#1E1846] mt-3">{testimonial.name}</h4>
                  </>
                )}
              <p className="text-[#302F2F] text-justify text-sm leading-loose">{testimonial.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
