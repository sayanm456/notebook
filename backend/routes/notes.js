const express = require("express");
const router = express.Router();
const Note = require("../model/Note");
const { body, validationResult } = require("express-validator");

//ROUTE-1: Get All the Notes using: GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", async (req, res) => {
    try {
        // const notes = await Note.findById({ user: req.user.id });
        const notes = await Note.find()
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE-2: Add a new Note using: POST "/api/notes/addnote".
router.post( "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 10 characters").isLength({ min: 10 }),], async (req, res) => 
    {
        try {
            const { title,  tag , description } = req.body;
            // if there are errors, return Bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        tag,
        description,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE-3: Update a existing Note using: PUT "/api/notes/updatenote".

router.put( "/updatenote/:_id", async (req, res) => 
    {
    const {title, tag, description} = req.body;
    try {
    
        // Crate a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(tag){newNote.tag = tag};
        if(description){newNote.description = description};

        // Find the note to be updated and update it
        let note = await Note.findByIdAndUpdate(req.params._id)
        if(!note){return res.status(404).send("Item Not Found")}

        if(note._id.toString() !== req.params._id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findOneAndUpdate(req.params._id, {$set: newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    })    


//ROUTE-4: Delete a existing Note using: DELETE "/api/notes/deletenote".
router.delete( "/deletenote/:_id", async (req, res) => 
{
    // const {title, description, tag} = req.body;

    try {
        // Find the note to be delete and delete it
        let note = await Note.findByIdAndDelete(req.params._id);
        if(!note){return res.status(404).send("Item Not Found")}

        // Aloow deletion only if user owns this Note
        if(note._id.toString() !== req.params._id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params._id)
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})    


module.exports = router;
