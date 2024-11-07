'use server'

import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";

export const fetchAccomodations = async ()=>{
    try{
        const querySnapshot = await getDocs(collection(db, "accomodations"));
        const accomodations = await Promise.all(
            querySnapshot.docs.map(async (doc)=>{
                const subCollectionSnapshot = await getDocs(collection(doc.ref, "accomodation"))
                const accomodationData = subCollectionSnapshot.docs.map(subDoc=>({
                    id:subDoc.id,
                    ...subDoc.data()
                }));

                return{
                    id:doc.id,
                    accomodationData, 
                    ...doc.data()
                }
            })
        )
        return accomodations;
    }
    catch(error){
        console.error("error fetching accomodations", error);
        return [];
    }
}

