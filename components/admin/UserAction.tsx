'use server'

import {collection, getDocs, doc, updateDoc} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const fetchUsers = async()=>{
    try{
        const querySnapshot = await getDocs(collection(db,"users"));
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
        console.error("error fetching users", error);
    }
}

export const updateUsers = async(userId:string, isAdmin:boolean)=>{
    try{
        const userRef = doc(db,"users",userId);
        await updateDoc(userRef, {isAdmin});
        return true;
    }
    catch(error){
        console.error("error updating useres", error)
        return null;
    }
}