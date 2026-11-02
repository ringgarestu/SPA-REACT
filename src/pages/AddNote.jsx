import React from "react";
import { addNote } from "../utils/api";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    const { error } = await addNote(note);

    if (!error) {
      navigate("/");
    } else {
      alert("Catatan gagal ditambahkan.");
    }
  }

  return (
    <section>
      <h2>Tambah Catatan</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddNote;
