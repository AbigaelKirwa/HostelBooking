import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog"; // Import shadcn components  
import { updateAccomodation } from "./AccomodationsActions"; // Function to update accommodation
import { Accommodations } from "@/types"; // Accommodation type

type UpdateAccommodationProps = {
    accommodationId: string; // ID of the accommodation to be updated
    currentData: Accommodations; // Current data of the accommodation
    onClose: () => void; // Close the dialog
};

export default function UpdateAccommodation({ accommodationId, currentData, onClose }: UpdateAccommodationProps) {
    const [newAccommodation, setNewAccommodation] = useState<Accommodations>(currentData);

    const handleUpdateAccommodation = async () => {
        await updateAccomodation({ id: accommodationId, data: newAccommodation });
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
                        value={newAccommodation.name}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={newAccommodation.city}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, city: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newAccommodation.location}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, location: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Text Color"
                        value={newAccommodation.text_color}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, text_color: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Button Color"
                        value={newAccommodation.button_color}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, button_color: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Background"
                        value={newAccommodation.background}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, background: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={newAccommodation.available || false}
                            onChange={(e) => setNewAccommodation({ ...newAccommodation, available: e.target.checked })}
                            className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                        />
                        <label className="ml-2 text-sm text-gray-700">Available</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Exterior Picture"
                        value={newAccommodation.exterior_picture}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, exterior_picture: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Interior Picture"
                        value={newAccommodation.interior_picture}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, interior_picture: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Paragraph One"
                        value={newAccommodation.paragraph_one}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, paragraph_one: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Paragraph Two"
                        value={newAccommodation.paragraph_two}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, paragraph_two: e.target.value })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="One Bedroom"
                        value={newAccommodation.one_bedroom ?? ''}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, one_bedroom: Number(e.target.value) })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="Two Bedroom"
                        value={newAccommodation.two_bedroom ?? ''}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, two_bedroom: Number(e.target.value) })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="Three Bedroom"
                        value={newAccommodation.three_bedroom ?? ''}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, three_bedroom: Number(e.target.value) })}
                        className="input-field border-solid border-2 border-gray-300 px-5 py-2 rounded text-sm"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="Four Bedroom"
                        value={newAccommodation.four_bedroom ?? ''}
                        onChange={(e) => setNewAccommodation({ ...newAccommodation, four_bedroom: Number(e.target.value) })}
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
