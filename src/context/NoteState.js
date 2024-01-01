import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
    // const s1={
    //     "name":"nishant",
    //     "class":"5b"
    // }
    // const [state,setState] = useState(s1);
    // const update= ()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name": "Changed Name",
    //             "class": "Changed Class"
    //         })
    //     },1000);
    // }
    const HOST="https://inotebook-backend-jvz5.onrender.com/api/notes";
    const addNote = async (note) => {
        const url=`${HOST}/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify(note)
        });
        const newNote = await response.json();; 
        setNotes(notes.concat(newNote));
        props.switchAlert('Notes added successfully','success');
    }

    const deleteNote = async (id) => {
        const url=`${HOST}/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json= await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        props.switchAlert('Notes deleted successfully','success');
    }

    const editNote = async (id,title,description,tag) => {
        const url=`${HOST}/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({id,title,description}),
        });
        const json= await response.json();
        console.log(json);
        // We can update notes[i] directly as it is a state so we need to create a deep copy and then update.
        // Assinging const ele=notes[i] and updating ele will not work as it will not update the array.
        let newNotes= JSON.parse(JSON.stringify(notes));
        for(let i=0;i<notes.length;i++){
            if(notes[i]._id===id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    const getNotes = async () => {
        //API Call
        const url = `${HOST}/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json= await response.json();
        setNotes(json);
    }

    const [notes, setNotes] = useState([]);

    return (
        // <NoteContext.Provider value={{state, update}}> 
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;