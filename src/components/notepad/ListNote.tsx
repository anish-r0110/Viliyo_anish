import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AddNote from "./AddNote";
import { useSelector, useDispatch } from "react-redux";
import { setActiveScreen, deleteNotes, saveNotes, setId, getNotes } from "@/store/reducers/notepad";
import { ITraineeNote } from "@/store/reducers/notepad";
import { AppDispatch, RootState } from "@/store";

const ListNote = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeScreen, getTraineeNotes, id } = useSelector( (state:RootState) => state.live.notepad);
  const { roomId } = useSelector( (state:RootState) => state.live.settings);

  React.useEffect(() => {
    
    if( roomId)
    dispatch(getNotes(parseInt(roomId)));
  }, [roomId]);

  const handleDeleteNote = (noteId: number) => {
    dispatch(deleteNotes(noteId));
  };

  const onClickNotes = (item: ITraineeNote, noteId: number) => {
    dispatch(setActiveScreen(2)); // Assuming activeScreen 2 is for editing notes
    dispatch(saveNotes({noteData:item.notes, id:noteId}));
    dispatch(setId(noteId));
  };

  return (
    <div className="text-base font-normal h-ful overflow-y-auto">
      {activeScreen === 1 ? (
        <div>
          <button
            className="bg-app-blue text-white px-4 py-2 rounded-md mb-4"
            onClick={() => dispatch(setActiveScreen(2))}
          >
            Add Note
          </button>
          {getTraineeNotes.length > 0 ? (
            getTraineeNotes.map((item, index) => (
              <div key={index} className="p-4">
                <div className="flex flex-col justify-start">
                  <p className="italic-date bg-white px-2 flex justify-end rounded-t-xl text-gray-500 text-sm">
                    {item.created_at.slice(0, 10)}
                  </p>
                  <div className="grid grid-cols-4 bg-white rounded-b-xl">
                    <div
                      className="col-span-3"
                      onClick={() => onClickNotes(item, item.id)}
                    >
                      <p className="font-bold bg-white px-2">
                        {item.notes.title}
                      </p>
                      <p className="bg-white px-2">
                        {item.sessionSegment.session.program.program_name}
                      </p>
                      <p className="bg-white px-2">
                        {item.sessionSegment.session.session_name}
                      </p>
                      <p className="bg-white px-2 rounded-b-xl">
                        {item.sessionSegment.batchId}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-white text-3xl text-app-blue px-2 py-8 w-full"
                        onClick={() => handleDeleteNote(item.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="PTQ-readsTextPara02">
              Your notes Area not created yet!!
            </p>
          )}
        </div>
      ) : activeScreen === 2 ? (
        <AddNote />
      ) : null}
    </div>
  );
};

export default ListNote;