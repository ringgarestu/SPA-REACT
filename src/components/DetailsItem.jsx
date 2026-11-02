import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";

function DetailsItem({ id, title, body, createdAt, archived, onDelete }) {
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="note-detail">
      <h1>{title}</h1>
      <p>Dibuat pada: {formattedDate}</p>
      <p>Status: {archived ? "Diarsipkan" : "Aktif"}</p>
      <p style={{ whiteSpace: "pre-wrap" }}>{body}</p>
      <DeleteButton id={id} onDelete={onDelete} />
    </article>
  );
}

DetailsItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DetailsItem;
