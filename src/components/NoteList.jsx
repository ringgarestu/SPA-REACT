import React from "react";
import NoteItem from "./NoteItem";
import Joi from "joi";
import { validateProps } from "../utils/validation";

const noteListPropsSchema = Joi.object({
  notes: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        createdAt: Joi.string().required(),
        archived: Joi.boolean().required(),
      }),
    )
    .required(),
  onDelete: Joi.function().required(),
});

function NoteList(props) {
  const validatedProps = validateProps(noteListPropsSchema, props, "NoteList");
  const { notes, onDelete } = validatedProps;
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} onDelete={onDelete} {...note} />
      ))}
    </div>
  );
}
export default NoteList;
