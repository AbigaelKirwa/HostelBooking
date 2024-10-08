'use server'

import {db, auth} from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {collection, addDoc} from 'firebase/firestore';

//server side function that will handle the form submission
export async function registerUser({fullname, email, password}:{fullname:string, email:string, password:string}){
    try{
        //create a user with firebase authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Set the displayName for the user
        await updateProfile(userCredential.user, {
            displayName: fullname
        });

        //store additional user data in firestore
        await addDoc(collection(db,"users"),{
            uid:userCredential.user.uid,
            fullname,
            email,
            createdAt: new Date(),
        })
        return {success:true, message:"user registered successfully!"};
    }
    catch(error:any){
        console.log("this is the error", error)
        return {success:false, message:error.message}
    }
}