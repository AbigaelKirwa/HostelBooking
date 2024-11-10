'use server'

import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const fetchPayments = async()=>{
    try{
        const querySnapshot = await getDocs(collection(db,"payments"));
        const users =querySnapshot.docs.map(doc=>{
            const data = doc.data()
            return{
                id:doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString():null
            }
        })
        return users
    }
    catch(error){
        console.error("error fetching accomodations", error);
    }
}