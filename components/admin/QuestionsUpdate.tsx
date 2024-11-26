import { useState} from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"; // Import shadcn components  
import { Questions } from "@/types"; // Accommodation type
import { updateQuestion } from "./QuestionsActions";

type UpdateAccommodationProps = {
    questionsId: string; // ID of the accommodation to be updated
    currentData: Questions; // Current data of the accommodation
    onClose: () => void; // Close the dialog
    onRefresh: () => void;
};

export default function UpdateQuestion({ questionsId, currentData, onClose, onRefresh }: UpdateAccommodationProps) {
    const [newQuestion, setnewQuestion] = useState<Questions>(currentData);

    const handleUpdateAccommodation = async () => {
        await updateQuestion({ id: questionsId, data: newQuestion });
        onRefresh()//refresh accomodations
        onClose(); // Close the modal after successful update
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent className="bg-white max-h-[80vh] overflow-y-auto p-6">
                <DialogTitle>Update Accommodation</DialogTitle>
                <div className="flex flex-col gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newQuestion.query}
                        onChange={(e) => setnewQuestion({ ...newQuestion, query: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newQuestion.answer}
                        onChange={(e) => setnewQuestion({ ...newQuestion, answer: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                </div>
                <DialogFooter>
                    <button onClick={handleUpdateAccommodation} className="bg-blue-500 text-white px-5 py-2 rounded mr-4">
                        Update
                    </button>
                    <button onClick={onClose} className="bg-gray-500 text-white px-5 py-2 rounded">
                        Cancel
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
