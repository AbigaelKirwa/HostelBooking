'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ButtonPink from "@/components/Button";
import { fetchAccomodations } from "@/app/accomodations/action";
import { useEffect, useState } from "react";
import { Accommodations } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import {checkAuth} from "@/hooks/checkAuth"
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"


if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined){
  throw Error
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function AccomodationPage() {
  const [accomodation, setAccomodation] = useState<Accommodations[]>([]);
  const [accomodationId, setAccomodationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = checkAuth();
  const userId = user ? user.uid : null; // Access userId only if user exists
  const userName = user ? user.fullname : null; // Access userName only if user exists

    useEffect (()=>{
        const getAccomodations = async () =>{
            const data = await fetchAccomodations() as Accommodations[]
            setAccomodation(data);
            setLoading(false);
        };
        getAccomodations();

        // Safely access window object on client side
        if (typeof window !== "undefined") {
          const path = window.location.pathname;
          const id = path.split("/").pop();
          setAccomodationId(id || userId);
        }
    },[])

    const handlePayment = async(amount:number, accomodationId:string, accomodationName:string)=>{
      try{
        console.log({ amount, userId, userName, accomodationId, accomodationName });
        if(user){
          const response = await fetch('/api/checkout_sessions',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({amount, userId, userName, accomodationId, accomodationName})
          })
          // Check if the response is ok
          if (!response.ok) {
            throw new Error(`Failed to create checkout session: ${response.statusText}`);
          }
    
          const {sessionId} = await response.json()
          const stripe = await stripePromise;
    
          if(stripe){
            //redirect to stripe checkout
            const {error} = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              console.log("Error redirecting to checkout", error)
            }
          }
          else{
            console.error("Stripe failed to initialize")
          }
        }
        else{
          toast({
            variant: "destructive",
            title: "You are not logged in",
            description: "To progress to payment, first log in",
          });
        }
        }
      catch(error){
        console.error('Error occurred during payment handling:', error);
      }
      
    }

  return (
    <div>
      <Navbar />
      <div>
        {loading ? (
          // if the questions array does not exist then display loader
          (
            <div className="flex flex-col p-20 gap-10 w-full max-sm:p-5">
              <div className="flex flex-row w-full gap-x-20 justify-center items-center max-sm:flex-col max-sm:gap-x-2 max-sm:gap-y-5">
                <div className="w-1/2 max-sm:w-full">
                  <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                </div>
                <div className="flex flex-col w-1/2 justify-center gap-y-2 max-sm:w-full">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                </div>
              </div>
              <div className="flex flex-row-reverse w-full gap-x-20 justify-center items-center max-sm:flex-col max-sm:gap-x-2 max-sm:gap-y-5">
                <div className="w-1/2 max-sm:w-full">
                  <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                </div>
                <div className="flex flex-col w-1/2 justify-center gap-y-2 max-sm:w-full">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                </div>
              </div>
            </div>
          )
        ):accomodation.map((specific_accomodation, index)=>(
          accomodationId === specific_accomodation.id ? (
          <>
            <div key={index} className="px-20 py-10 flex justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
              <div id="image" className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
                <img src={specific_accomodation.exterior_picture} alt="confused" className="w-[90%]" />
              </div>
              <div id="words" className="w-1/2 flex flex-col justify-center items-center px-10 text-justify gap-10 max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:gap-5 max-md:px-9 max-sm:px-5">
                <p className="text-sm leading-loose text-[#302F2F]">{specific_accomodation.paragraph_one}</p>
                <div className="flex justify-start w-full">
                  <Link href="#payment_plans">
                    <ButtonPink paddingX="4em" paddingY="2em">
                      View Payment Plans
                    </ButtonPink>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-10  flex flex-row-reverse justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
              <div id="image" className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
                <img src={specific_accomodation.interior_picture} alt="interior" className="w-[90%]" />
              </div>
              <div id="words" className="w-1/2 flex flex-col justify-center items-center px-14 text-justify gap-10 max-md:w-full max-md:flex max-md:gap-5 max-md:px-9 max-sm:px-5">
                <p className="text-sm leading-loose text-[#302F2F]">{specific_accomodation.paragraph_two}</p>
              </div>
            </div>
            <div id="payment_plans" className="py-10">
              <h2 className="font-bold text-center text-6xl my-10 text-[#1E1846] max-lg:text-5xl max-md:text-4xl max-md:px-10">
                Our Payment Plans
              </h2>
              <div className="grid grid-cols-2 gap-x-20 gap-y-20 px-20 py-10 justify-center items-center max-lg:grid-cols-1 max-lg:px-40 max-md:px-10">
                  {[specific_accomodation.four_bedroom, specific_accomodation.three_bedroom, specific_accomodation.two_bedroom, specific_accomodation.one_bedroom].map((bedroom, index)=>{
                    // Add null check for 'bedroom'
                    if (bedroom === null) return null; // Skip rendering if bedroom is null
                    return(
                      <div key={index} className="flex flex-col gap-y-3 px-10 py-10 rounded-3xl text-sm text-center" style={{background: "#D9D9D9", boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.2)", color:"black"}}>
                    <h2 className="font-bold text-3xl mb-5 max-sm:mb-3">{index +1} Bedroom</h2>
                    <p>Monthly Plan: Ksh.{bedroom}</p>
                    <p>Semester Plan: (4 months): Ksh.{bedroom * 4}</p>
                    <p>Annual Plan: (12 months): Ksh.{bedroom * 12}</p>
                    <div className="flex justify-center gap-5 max-sm:flex-col max-sm:gap-1">
                      <button
                        onClick={() => handlePayment(bedroom, specific_accomodation.id, specific_accomodation.name)} // Monthly payment
                        className="text-white text-xs font-semibold rounded-full mt-5 px-[2em] py-[1em] hover:bg-teal-700"
                        style={{ background: "#264A5A" }}
                      >
                        Pay Monthly
                      </button>
                      <button
                        onClick={() => handlePayment(bedroom * 4, specific_accomodation.id, specific_accomodation.name)} // Semester payment
                        className="text-white text-xs font-semibold rounded-full mt-5 px-[2em] py-[1em] hover:bg-teal-700"
                        style={{ background: "#E24848" }}
                      >
                        Pay Semester
                      </button>
                      <button
                        onClick={() => handlePayment(bedroom * 12, specific_accomodation.id, specific_accomodation.name)} // Annual payment
                        className="text-white text-xs font-semibold rounded-full mt-5 px-[2em] py-[1em] hover:bg-teal-700"
                        style={{ background: "#264A5A" }}
                      >
                        Pay Annual
                      </button>
                    </div>
                    </div>
                  )
                    
                })}
              </div>
            </div>
          </>
        ):null
        ))}
      </div>
      <Footer/>
    </div>
  );
}
