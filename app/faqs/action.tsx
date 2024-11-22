import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getQuestions = async() =>{
    try{
        const querySnapshot =  await  getDocs(collection(db,"questions"));
        const questions = querySnapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        }))
        return questions
    }
    catch(error){
        console.log("Error fetching questions ", error)
        return []
    }
}