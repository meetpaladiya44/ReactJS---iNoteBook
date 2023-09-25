  import React, { useState } from "react";
  import NoteContext from "./NoteContext";

const NoteState =   (props)=>{

  // Created a context variable the value of which we can access from anywhere
  // const initialnotes = [ {
    //     "_id": "63e92d479519e93395cf2012",
    //     "user": "63e8df4d2958dc03b1bd85f7",
    //     "title": "Trial",
    //     "description": "Work Hard",
    //     "tag": "none",
    //     "date": "2023-02-12T18:17:43.458Z",
    //     "__v": 0
    //   },
    //   {
    //     "_id": "63e92d489519e93395cf2014",
    //     "user": "63e8df4d2958dc03b1bd85f7",
    //     "title": "Trial",
    //     "description": "Work Hard",
    //     "tag": "none",
    //     "date": "2023-02-12T18:17:44.000Z",
    //     "__v": 0
    //   }
    // ];
    
    // Defined host which is to be applied in url
    const host = "http://localhost:3080"

    // Empty array to pass in notes variable initially
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

      // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    // console.log(json)
    setNotes(json)
  }
    
   // Add a Note
   const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });


    // console.log("Adding a new note")
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {

    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
    });

    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {

    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    // console.log(json);
      
    let newNotes = JSON.parse(JSON.stringify(notes))
      // Main logic behind editing in the client
      for(let index=0;index < newNotes.length;index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }


    // For Learning purpose
    // const s1 ={
    //     "name":"Parth",
    //     "skill":"Procastination"
    // }
    // const [state,setState] =useState(notes);
    // const update=()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"Malaviya",
    //             "skill":"Hard Work"
    //         })
    //     },10000);   
    // }

    return(

        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children};
        </NoteContext.Provider>

        // For Learning purpose
        // Pass the value of data which you want to access from anywhere
        // <NoteContext.Provider value ={{state:state, update:update}}>
        //     {/* The below thing shorts all the children in the middle */}
        //     {props.children};
        // </NoteContext.Provider>
    )
}

export default NoteState;