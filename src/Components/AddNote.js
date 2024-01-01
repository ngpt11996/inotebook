import React, {useState, useContext} from 'react'
import noteContext from '../context/notecontext';

const AddNote = () => {
    const context=useContext(noteContext);
    let {addNote}=context;

    const[note,setNote]= useState({"title": "","description":"", "tag":""})
    const onClick= (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({"title": "","description":"", "tag":""});
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }
    return (
        <div>
            <h2 className='mt-3'>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange}
                    minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}
                    minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange} name="tag"/>
                </div>
                <button type="submit" disabled={note.title.length<=3 || note.description.length<=5} className="btn btn-primary" onClick={onClick}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNote
