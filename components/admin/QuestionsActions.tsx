'use server'

import {collection, getDocs} from "firebase/firestore"
import { db } from "@/lib/firebase"

export const fetchQuestions = async () =>{
    try{
        const querySnapshot = await getDocs(collection(db, 'questions'))
        const questions = querySnapshot.docs.map((doc)=>{
            const questionsData = doc.data()
            return{
                id:doc.id,
                ...questionsData
            }
        })
        return questions
    }catch(error){
        console.log("Error fetching questions", error)
    }
}