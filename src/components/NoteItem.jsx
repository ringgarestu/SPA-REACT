import React from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import { validateProps } from "../utils/validation";

const noteItemPropsSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  createdAt: Joi.string().required(),
  archived: Joi.boolean().required(),
  onDelete: Joi.function().required(),
});

function NoteItem(props) {
  const validatedProps = validateProps(noteItemPropsSchema, props, "NoteItem");
  const { id, title, body, createdAt, onDelete } = validatedProps;

  return (
    <div className="note-item">
      <Link to={`/notes/${id}`} className="note-item__detail">
        <NoteItemBody name={title} body={body} />
        <div className="note-item__date">{createdAt}</div>
      </Link>

      <div className="note-item__action">
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default NoteItem;
