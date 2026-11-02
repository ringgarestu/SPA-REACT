import React from "react";
import Joi from "joi";
import { validateProps } from "../utils/validation";

const NoteInputPropsSchema = Joi.object({
  addNote: Joi.func().required(),
});
class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    const validatedProps = validateProps(NoteInputPropsSchema, props, "NoteInput");

    this.state = {
      title: "",
      body: "",
      validatedProps,
    };
    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }
  onBodyChangeHandler(event) {
    this.setState(() => {
      return { body: event.target.value };
    });
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const { addNote } = this.state.validatedProps;
    addNote(this.state);
  }

  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitHandler}>
        <input type="text" placeholder="Judul" value={this.state.title} onChange={this.onTitleChangeHandler} />
        <input type="text" placeholder="Catatan" value={this.state.body} onChange={this.onBodyChangeHandler} />
        <button type="submit">Tambah</button>
      </form>
    );
  }
}

export default NoteInput;
