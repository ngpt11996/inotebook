import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../context/notecontext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(notecontext);
    let { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    const [isEditModal, setIsEditModal] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })

    const onClick = (e) => {
        console.log("Updating the note...")
        // e.preventDefault(); ->NO need as this button is not part of the form
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        setIsEditModal(false);
        props.switchAlert('Notes Updated Successfully', 'success');
        //If we use sub,it with form insted of click then required and minLength func will work..
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        // console.log(ref+":"+currentNote.title+":"+currentNote._id+":"+currentNote.description+":"+currentNote.tag);
        ref.current.click();
        console.log("update"+isEditModal);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const ref = useRef();
    const refClose = useRef();
    return (
        <>
            <AddNote />
            <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {isEditModal ? <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            : <h1 className="modal-title fs-5" id="exampleModalLabel">My Note</h1>}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" readOnly={!isEditModal} value={note.etitle} className="form-control" id="etitle" name="etitle" onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea readOnly={!isEditModal}  rows="6" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" readOnly={!isEditModal} value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {isEditModal && <button disabled={note.etitle.length <= 3 || note.edescription.length <= 5} type="button" onClick={onClick} className="btn btn-primary">Update Note</button>}
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your Notes</h2>
            <div className="row">
                <div className="container mx-1">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} setIsEditModal={setIsEditModal} switchAlert={props.switchAlert} />
                })}
            </div>
        </>
    )
}
export default Notes
