import * as React from "react";
import IndividualCard from "./individualCard";
import AddPerson from "./addPerson";
import "./styles.css";

export default function App() {
  // State to handle list of people
  const [users, setUsers] = React.useState([]);
  // State to show/hide add user form
  const [showAddForm, setShowAddForm] = React.useState(false);
  //State to handle new added user
  const [newUser, setNewUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  //State to handle error state in input fields of add person form
  const [error, setError] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  // Function to fetch data from a mock API
  const fetchDataFromApi = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
    console.log(json.data);
  };

  React.useEffect(() => {
    fetchDataFromApi();
  }, []);

  // Function to handle deleting a card
  const handleDelete = (cardId) => {
    fetch(`https://reqres.in/api/users/${cardId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res) {
          console.log("oops");
          return false;
        } else {
          return res.json();
        }
      })
      .then((data) => data.json())
      .catch((err) => console.log("error", err));

    setUsers(users.filter((card) => card.id !== cardId)); // Remove from state
    // Optionally send a delete request to your API
  };
  // Function to handle deleting a card
  const handleChange = (e) => {
    const { type = "", name = "", value = "", files = [] } = e.target;

    let fileUrl = type === "file" ? URL.createObjectURL(files?.[0]) : "";
    setNewUser((prevState) => {
      return {
        ...prevState,
        [name]: type === "file" ? fileUrl : value,
      };
    });
    setError((prevError) => {
      return {
        ...prevError,
        [name]: "",
      };
    });
  };
  //Function to handle validation in add person form
  const validation = () => {
    const { firstName, lastName, email, avatar } = newUser;
    let noError = true;
    if (!firstName) {
      noError = false;
      setError((prevError) => ({
        ...prevError,
        firstName: "Please enter your first name",
      }));
    } else if (!lastName) {
      noError = false;
      setError((prevError) => ({
        ...prevError,
        lastName: "Please enter your last name",
      }));
    } else if (!email) {
      noError = false;
      setError((prevError) => ({
        ...prevError,
        email: "Please enter your email id",
      }));
    } else if (!avatar) {
      noError = false;
      setError((prevError) => ({
        ...prevError,
        avatar: "Please set your profile picture",
      }));
    }
    return noError;
  };
  // Function to handle adding a new card
  const handleSubmit = (e) => {
    console.log("SDdafs", validation());
    if (!validation()) {
      return false;
    }
    fetch("https://reqres.in/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res) {
          console.log("problem");
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setUsers((prevState) => [
          ...prevState,
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            avatar: data.avatar,
            id: prevState.length + 1,
          },
        ]);
      });
    handleForm(false);
  };
  // Function to handle changing data in input fields
  handleForm = (val) => {
    setShowAddForm(val);
    if (!val) {
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
      });

      setError({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
      });
    }
  };
  // Function to return UI for individual people card
  const showUserList = () => {
    const list = users.length
      ? users.map((user) => {
          const { id, first_name, last_name, email, avatar } = user;
          return (
            <IndividualCard
              id={id}
              firstName={first_name}
              lastName={last_name}
              email={email}
              avatar={avatar}
              handleDelete={handleDelete}
            />
          );
        })
      : null;
    return list;
  };
  return (
    <div className="App">
      <h1>Hello People!</h1>
      <AddPerson
        showAddForm={showAddForm}
        handleChange={handleChange}
        newUser={newUser}
        handleSubmit={handleSubmit}
        handleForm={handleForm}
        error={error}
      />
      <div className={`${showAddForm ? "blur" : ""} flex`}>
        {showUserList()}
      </div>
    </div>
  );
}
