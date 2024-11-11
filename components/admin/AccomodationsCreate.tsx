import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"; // Import shadcn components  
import { createAccommodation } from "./AccomodationsActions";
import { Accommodations } from "@/types";
import { IoIosAddCircle } from "react-icons/io";


export default function(){
    const [showModal, setShowModal] = useState(false); // State to control the modal
    const [newAccommodation, setNewAccommodation] = useState<{
        id:string;
        name: string;
        city: string;
        location: string;
        text_color: string;
        button_color: string;
        background: string;
        available: boolean;
        exterior_picture: string;
        interior_picture: string;
        paragraph_one: string;
        paragraph_two: string;
        one_bedroom: number | null;
        two_bedroom: number | null;
        three_bedroom: number | null;
        four_bedroom: number | null;
      }>({
        id:"",
        name: "",
        city: "",
        location: "",
        text_color: "",
        button_color: "",
        background: "",
        available: false,
        exterior_picture: "",
        interior_picture: "",
        paragraph_one: "",
        paragraph_two: "",
        one_bedroom: null,
        two_bedroom: null,
        three_bedroom: null,
        four_bedroom: null
      });
        //adding new accomodation
        const handleAddAccommodation = async (newAccommodation:Accommodations) => {
            await createAccommodation({data:newAccommodation})
            setShowModal(false)
            setNewAccommodation({
                id:"",
                name: "",
                city: "",
                location: "",
                text_color: "",
                button_color: "",
                background: "",
                available: false,
                exterior_picture: "",
                interior_picture: "",
                paragraph_one: "",
                paragraph_two: "",
                one_bedroom: null,
                two_bedroom: null,
                three_bedroom: null,
                four_bedroom: null
            })
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
                            placeholder="Name"
                            required
                            value={newAccommodation.name}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={newAccommodation.city}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, city: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            required
                            value={newAccommodation.location}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, location: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Text Color"
                            required
                            value={newAccommodation.text_color}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, text_color: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Button Color"
                            required
                            value={newAccommodation.button_color}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, button_color: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Background"
                            required
                            value={newAccommodation.background}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, background: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <div>
                            <input
                                type="checkbox"
                                checked={newAccommodation.available || false} // Defaults to false if undefined
                                onChange={(e) => setNewAccommodation({ ...newAccommodation, available: e.target.checked })}
                                className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                            />
                            <label className="ml-2 text-sm text-gray-700">Available</label>
                        </div>
                        <input
                            type="text"
                            placeholder="Exterior Picture"
                            required
                            value={newAccommodation.exterior_picture}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, exterior_picture: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Interior Picture"
                            required
                            value={newAccommodation.interior_picture}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, interior_picture: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Paragraph One"
                            required
                            value={newAccommodation.paragraph_one}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, paragraph_one: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Paragraph Two"
                            required
                            value={newAccommodation.paragraph_two}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, paragraph_two: e.target.value })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="number"
                            min={0}
                            placeholder="One Bedroom"
                            required
                            value={newAccommodation.one_bedroom??''}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, one_bedroom: Number(e.target.value) })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="number"
                            min={0}
                            placeholder="Two Bedroom"
                            required
                            value={newAccommodation.two_bedroom??''}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, two_bedroom: Number(e.target.value) })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="number"
                            min={0}
                            placeholder="Three Bedroom"
                            required
                            value={newAccommodation.three_bedroom??''}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, three_bedroom: Number(e.target.value) })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <input
                            type="number"
                            min={0}
                            placeholder="Four Bedroom"
                            required
                            value={newAccommodation.four_bedroom??''}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, four_bedroom: Number(e.target.value) })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <button onClick={()=>{handleAddAccommodation(newAccommodation)}} className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-800 transition-colors">Add</button>
                        <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 py-2 px-3 rounded hover:bg-gray-500 transition-colors">Cancel</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}