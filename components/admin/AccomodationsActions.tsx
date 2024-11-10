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

// Unified function for creating documents in either the main collection or subcollection
export const createDocument = async ({ parentId = null, data }: {parentId:null, data:Accommodations}) => {
    try {
        // Remove id from data if it exists to avoid overwriting
        const { id, ...dataWithoutId } = data;

        const collectionRef = parentId 
            ? collection(db, "accommodations", parentId, "accommodation") 
            : collection(db, "accommodations");
        
        const docRef = await addDoc(collectionRef, data);
        return { id: docRef.id, ...dataWithoutId };
    } catch (error) {
        console.error("Error creating document:", error);
        return null;
    }
};

// Unified function for updating documents in either the main collection or subcollection
export const updateDocument = async ({ parentId = null, id, data }:{parentId:string |null, id:string, data:Accommodations}) => {
    try {
        // Remove id from data if it exists to avoid overwriting
        const { id: dataId, ...dataWithoutId } = data;
        const docRef = parentId 
            ? doc(db, "accommodations", parentId, "accommodation", id) 
            : doc(db, "accommodations", id);

        await updateDoc(docRef, dataWithoutId);
        return { id, ...dataWithoutId };
    } catch (error) {
        console.error("Error updating document:", error);
        return null;
    }
};

// Unified function for deleting documents from either the main collection or subcollection
export const deleteDocument = async ({ parentId = null, id }:{parentId:string |null, id:string}) => {
    try {
        const docRef = parentId 
            ? doc(db, "accommodations", parentId, "accommodation", id) 
            : doc(db, "accommodations", id);

        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting document:", error);
        return null;
    }
};

