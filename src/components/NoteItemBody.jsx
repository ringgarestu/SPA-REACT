import React from "react";
import Joi from "joi";
import { validateProps } from "../utils/validation";

const noteItemBodyPropsSchema = Joi.object({
  name: Joi.string().required(),
  body: Joi.string().required(),
});

function NoteItemBody(props) {
  const validatedProps = validateProps(noteItemBodyPropsSchema, props, "NoteItemBody");
  const { name, body } = validatedProps;

  return (
    <div className="note-item__body">
      <h3 className="note-item__title">{name}</h3>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

export default NoteItemBody;
