const express = require("express");
const { noteModel } = require("../models/note.model");
const notesRoute = express.Router();

notesRoute.get("/", async (req, res) => {
  try {
    const note = await noteModel.find({ userID: req.body.userID });
    console.log(req);
    res.status(200).send({ data: note });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

notesRoute.post("/add", async (req, res) => {
  try {
    console.log(req.body.userID);
    const newNote = noteModel(req.body);
    console.log(newNote);
    await newNote.save();
    res.send("note created successfully!");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

notesRoute.delete("/:id", async (req, res) => {
  try {
    const noteData = await noteModel.findOne({ _id: req.params.id });

    if (noteData.userID == req.body.userID) {
      await noteModel.findByIdAndDelete({ _id: noteData._id });
      res.send({ msg: "note deleted successfully!" });
    } else {
      res.send({ msg: "You are not authorized to delte the note " });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = { notesRoute };
