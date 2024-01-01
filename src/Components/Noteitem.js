import React, { useContext } from 'react'
import notecontext from '../context/notecontext'

const Noteitem = (props) =>{
    const {note,updateNote,setIsEditModal}= props;
    const context = useContext(notecontext);
    const {deleteNote} =context;

    const onClick=()=>{
        console.log(note._id);
        deleteNote(note._id);
        props.switchAlert('Notes Deleted Successfully','success');
    }
    
    return (
    <div className="col-md-3 my-3">
        <div className="card">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-regular fa-trash-can mx-2" onClick={onClick}></i>
                <i className="fa-regular fa-pen-to-square" onClick={()=>{
                    setIsEditModal(true);
                    updateNote(note);
                    }}></i>
            </div>
            <p className="card-text">{note.description.slice(0,5)}{"..."} </p>
            <button type="submit" className="btn btn-primary" onClick={()=>{
                setIsEditModal(false);
                updateNote(note);
            }}>Open Notes</button>
        </div>
        </div>
    </div>
  )
}

export default Noteitem