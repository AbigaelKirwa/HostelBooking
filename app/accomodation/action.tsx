'use server'

import {collection, getDocs, query, where} from "firebase/firestore"
import {db} from "@/lib/firebase"

export const fetchAccomodation = async(accomodations_id?: string) =>{
    try{
        const accomodationsRef = collection(db,"accomodation")
        const data = query(accomodationsRef, where("accomodations_id", "==", accomodations_id))
        const querySnapshot = await getDocs(data)
        const accomodation = querySnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data(),
        })) 
        return accomodation
    }catch(error){
        console.log(error)
        return null
    }
}