import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { saveNotes, setActiveScreen } from "@/store/reducers/notepad";
import { AppDispatch, RootState } from "@/store";

const AddNote = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentNote, id } = useSelector((state : RootState) => state.live.notepad);

  const saveNote = () => {
   if(currentNote && id){
     dispatch(saveNotes({ noteData: currentNote, id }));
   }
    //dispatch(setActiveScreen(1)); // Return to the notes list after saving
  };

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(saveNotes({ [name]: value }));
  // };

  return (
    <div className="w-full h-full">
      <div className="bg-gray-900 flex rounded-tl-xl w-full">
        <div className="text-white p-2 flex justify-center py-4">
          <p>Notepad</p>
        </div>
      </div>
      <div className="bg-app-purple-100">
        <button
          className="text-4xl text-app-blue px-2 py-4"
          onClick={() => dispatch(setActiveScreen(1))}
        >
          <IoArrowBack />
        </button>
        <input
          id="title"
          name="title"
          className="w-full text-xl bg-app-purple-100 text-gray-700 p-4 border-none"
          placeholder="Add a Title"
          value={currentNote?.title || ""}
          // onChange={handleOnChange}
        />
        <div className="border-2 border-gray-200 h-96 overflow-y-auto">
          <textarea
            id="content"
            className="w-full h-96 overflow-y-auto text-base bg-app-purple-100 text-gray-700 p-4 border-none"
            placeholder="Type something..."
            value={currentNote?.content || ""}
            // onChange={handleOnChange}
          />
        </div>
        <button
          className="bg-app-blue text-white px-4 py-2 rounded-md mt-4"
          onClick={saveNote}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default AddNote;