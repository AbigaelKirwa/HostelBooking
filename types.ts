export interface Accommodations {
    id: string;
    available: boolean;
    background: string;
    button_color: string;
    city: string;
    description_one: string;
    description_two: string;
    exterior_picture: string;
    interior_picture: string;
    location: string;
    name: string;
    text_color: string;
    accomodationData:AccomodationDetail[];
  }

  export interface AccomodationDetail{
    id:string,
    exterior_picture:string,
    interior_picture:string,
    paragraph_one:string,
    paragraph_two:string,
    one_bedroom:number,
    two_bedroom:number,
    three_bedroom:number,
    four_bedroom:number
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
  