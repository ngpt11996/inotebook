const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require('./Middleware/fetchuser');
const Note = require('../models/Note');

router.get('/fetchallnotes', fetchuser,  async (req,res)=>{
    try {
        const notes=await Note.find({user: req.user.id});
        res.json(notes)   
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', fetchuser, [
    body("title", "Title must be 3 characters").isLength({ min: 3 }),
    body("description", "Description must be 5 characters").isLength({ min: 5 })
], async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note= new Note({
            title,description,tag, user: req.user.id
        });
        const savedNote=await note.save();
        res.json(savedNote)   
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    try {
        const {title,description,tag} = req.body;
        const newNote={};
        if(title) {newNote.title=title};
        if(description) {newNote.description=description};
        if(tag) {newNote.tag=tag};
        
        let note=await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note})   
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletenote/:id', fetchuser,async (req,res)=>{
    try {
        
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).send("Not Found")
        }

        let note=await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}

        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted"})   
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router