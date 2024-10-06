'use server'

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../lib/firebase"

export async function LoginUser({email,password}:{email:string, password:string}){
    try{
        const loginCredential = await signInWithEmailAndPassword(auth, email, password)
        return{
            success:true,
            message:"User logged in successfully",
            uid: loginCredential.user.uid,
            email: loginCredential.user.email,
        }
    }
    catch(error:any){
        console.log("Login error:", error);
        return{ success:false, message: error.message}
    }
}