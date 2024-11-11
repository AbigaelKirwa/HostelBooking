'use server'

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const fetchAccomodations = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "accomodations"));
        const accomodations = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return accomodations;
    } catch (error) {
        console.error("Error fetching accomodations:", error);
        return [];
    }
}
