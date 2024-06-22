import * as React from "react";
import "./styles.css";
export default function AddPerson({
  showAddForm,
  handleChange,
  newUser,
  handleSubmit,
  handleForm,
  error: { firstName, lastName, email, avatar } = {},
}) {
  return (
    <div className="form-container">
      {showAddForm ? (
        <div className="input-form login-box">
          <button
            className="close delete-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleForm(false);
            }}
          >
            ✖️
          </button>

          <div class="user-box">
            <input
              type="text"
              onChange={handleChange}
              value={newUser.firstName}
              name="firstName"
              id="firstName"
            />
            <div className="error">{firstName}</div>
            <label>First Name</label>
          </div>
          <div class="user-box">
            <input
              type="text"
              onChange={handleChange}
              value={newUser.lastName}
              name="lastName"
              id="lastName"
            />
            <div className="error">{lastName}</div>
            <label>Last Name</label>
          </div>
          <div class="user-box">
            <input
              type="text"
              onChange={handleChange}
              value={newUser.email}
              name="email"
              id="email"
            />
            <div className="error">{email}</div>
            <label>Email Id</label>
          </div>
          <div class="user-box">
            <input
              type="file"
              onChange={handleChange}
              name="avatar"
              id="avatar"
              accept="image/png, image/jpeg"
            />
            <div className="error">{avatar}</div>
            <label>Upload Picture</label>
          </div>
          <button type="submit" onClick={handleSubmit} className="add-form-btn">
            Add
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleForm(true);
            }}
            className="add-people-btn"
          >
            Add people
          </button>
        </div>
      )}
    </div>
  );
}
