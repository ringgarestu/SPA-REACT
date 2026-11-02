import React from "react";
import PropTypes from "prop-types";
import { FiTrash } from "react-icons/fi";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="note-detail__delete" onClick={() => onDelete(id)}>
      <FiTrash />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
