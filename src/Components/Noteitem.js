import React from 'react'
import noteContext from '../context/notes/NoteContext';
import { useContext } from 'react'

const Noteitem = (props) => {
  
  const context = useContext(noteContext);
  
  // Taking the value of notes from the prop passed while rendering Noteitem.js
  const {note, updateNote} = props;
  const {deleteNote} = context;

  const delClickHandler = ()=>{
    deleteNote(note._id);
  }

  return (  
    <div className='col-md-3'>
        {/* {note.title}
        {note.description} */}
        <div className="card my-2">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text mb-0">{note.description}</p>
    <h6 className="card-text mb-3">{note.tag}</h6>
    <i className="fa-solid fa-trash fa-sharp me-2" onClick={delClickHandler}></i>
    <i className="fa-sharp fa-solid fa-pen-to-square me-2" onClick={()=>{updateNote(note)}}></i>
    </div>
</div>
    </div>
  )
}

export default Noteitem