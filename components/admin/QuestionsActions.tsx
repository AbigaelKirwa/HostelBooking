'use server'

import {collection, getDocs, addDoc, doc, deleteDoc} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Questions } from "@/types"

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

export const createQuestion = async (data:{query:string, answer:string}) =>{
    try{
        await addDoc(collection(db,'questions'),{
            ...data
        })
        return {data}
    }catch(error){
        console.log("Error creating a question", error)
    }
}

export const deleteQuestion = async (id:string)=>{
    try{
        await deleteDoc(doc(db,'questions',id))
        return id;
    }catch(error){
        console.log("Error deleting question", error)
        return null
    }
}