'use server'

import {collection, getDocs, doc, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";
import { Accommodations } from "@/types";

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

// Unified function for creating documents in the main collection only
export const createAccommodation = async ({ parentId = null, data }: { parentId?: string | null, data: Accommodations }) => {
    try {
        const { id, ...dataWithoutId } = data;

        // Main collection reference
        const collectionRef = parentId 
        ? collection(db, "accomodations", parentId, "accomodations")
        : collection(db, "accomodations");


        // Add main document (accommodation without `accommodationData`)
        const docRef = await addDoc(collectionRef, dataWithoutId);

        return { id: docRef.id, ...dataWithoutId };
    } catch (error) {
        console.error("Error creating accommodation:", error);
        return null;
    }
};

// Unified function for updating accommodation document
export const updateAccomodation = async ({ id, data }: { id: string, data: Accommodations }) => {
    try {
        // Remove id from data if it exists to avoid overwriting
        const { id: dataId, ...dataWithoutId } = data;

        // Directly reference the document using the id
        const docRef = doc(db, "accomodations", id);

        // Update the document
        await updateDoc(docRef, dataWithoutId);
        return { id, ...dataWithoutId };
    } catch (error) {
        console.error("Error updating document:", error);
        return null;
    }
};

// Unified function for deleting documents from either the main collection or subcollection
export const deleteAccomodation = async ({ parentId = null, id }:{parentId:string |null, id:string}) => {
    try {
        const docRef = parentId 
            ? doc(db, "accomodations", parentId, "accomodation", id) 
            : doc(db, "accomodations", id);

        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting document:", error);
        return null;
    }
};

