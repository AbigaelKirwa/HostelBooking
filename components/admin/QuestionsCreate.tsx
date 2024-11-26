import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"; // Import shadcn components  
import { createQuestion } from "./QuestionsActions";
import { Questions } from "@/types";
import { IoIosAddCircle } from "react-icons/io";
type QuestionsCreateProps = {
    onRefresh: () => void;
};


export default function QuestionsCreate({onRefresh}: QuestionsCreateProps){
    const [showModal, setShowModal] = useState(false); // State to control the modal
    const [newQuestion, setNewQuestion] = useState<{
        query:string;
        answer:string;
      }>({
        query:"",
        answer:""
      });

    //adding new accomodation
    const handleAddQuestion = async () => {
        const success = await createQuestion(newQuestion)
        if(success){
            onRefresh()
            setShowModal(false)
            //set to null
            setNewQuestion({
                query:"",
                answer:""
            })
        }
    }

    return(
        <>
        <button onClick={() => setShowModal(true)}>
            <IoIosAddCircle className="text-xl" />
        </button>
        {/* create modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogOverlay />
                <DialogContent className="bg-white max-h-[80vh] overflow-y-auto p-6">
                    <DialogTitle>Add New Accommodation</DialogTitle>
                    <div className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Question"
                            required
                            value={newQuestion.query}
                            onChange={(e) => setNewQuestion({ ...newQuestion, query: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Answer"
                            required
                            value={newQuestion.answer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <button onClick={()=>{handleAddQuestion()}} className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-800 transition-colors">Add</button>
                        <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 py-2 px-3 rounded hover:bg-gray-500 transition-colors">Cancel</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}