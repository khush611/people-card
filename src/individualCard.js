import * as React from "react";
import "./styles.css";

export default function IndividualCard({
  id,
  firstName,
  lastName,
  email,
  avatar,
  handleDelete,
}) {
  //Function to delete person
  const deletePerson = (id) => {
    handleDelete(id);
  };
  return (
    <div key={id} className="people-card">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deletePerson(id);
        }}
        className="delete-btn"
      >
        ✖️
      </button>
      <p>
        <strong>Hello!</strong>
      </p>
      <p>
        <strong>{firstName + " " + lastName}</strong>
      </p>
      <p>{email}</p>
      <img key={avatar} src={avatar} width="128" height="128" />
    </div>
  );
}
