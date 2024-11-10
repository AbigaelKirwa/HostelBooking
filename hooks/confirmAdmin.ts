import { useEffect, useState } from "react"
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from "@/lib/firebase"

export const confirmAdmin = () =>{
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        //check if user is an admin
        const checkAdmin = async ()=>{
            const unsubscribe = onAuthStateChanged(auth, async(user)=>{
                if(user){
                    const db = getFirestore()
                    const usersCollection= collection(db, 'users')
                    const q = query(usersCollection, where ('uid', '==', user.uid))
                    const querySnapshot = await getDocs(q);


                    if(!querySnapshot.empty){
                        const userDoc = querySnapshot.docs[0];
                        if(userDoc.exists() && userDoc.data().isAdmin){
                            setIsAdmin(true)
                        }
                        else{
                            window.location.replace('/admin/login')
                        }
                    }
                    else{
                        window.location.replace('/admin/login')
                    }
                }
                else{
                    window.location.replace('/admin/login')
                }
                setIsLoading(false)
            })
            return unsubscribe;
        };
        checkAdmin()
    },[]) 

    return {isAdmin, isLoading}
}