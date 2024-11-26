'use server'

import {collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore"
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
    }catch(error){
        console.log("Error deleting question", error)
        return null
    }
}

export const updateQuestion = async({id, data}:{id:string, data:Questions})=>{
    try{
        //remove id if it exists in the data being sent
        const {id: unusedId, ...dataWithoutId} = data
        await updateDoc(doc(db,'questions', id),dataWithoutId)
    }catch(error){
        console.log("Error updating question", error)
    }
}