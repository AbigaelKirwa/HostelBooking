import { StaticImageData } from "next/image";

export interface Accommodations {
  id: string;
  available: boolean;
  background: string;
  button_color: string;
  city: string;
  exterior_picture: string;
  interior_picture: string;
  location: string;
  name: string;
  text_color: string;
  paragraph_one:string;
  paragraph_two:string;
  one_bedroom:number|null;
  two_bedroom:number|null;
  three_bedroom:number|null;
  four_bedroom:number|null;
}

export interface Users{
  id:string;
  fullname:string;
  email:string;
}

export interface Payments{
  paymentId:string,
  accomodationId:string,
  userId:string,
  accomodationName:string,
  userName:string,
  amount:number,
  createdAt:string,
}

export interface Questions{
  id:string,
  value:string,
  query:string,
  answer:string
}

export interface Testimonials{
  id:number,
  image:StaticImageData,
  name:string,
  paragraph:string
}

export interface Counts{
  id:number,
  image:StaticImageData,
  number:string,
  name:string
}
  