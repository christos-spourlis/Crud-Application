import React, { useState } from "react";

const CreateUser = ({ onSave }) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "name" && value.length <= 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Name should be more than 5 characters",
      }));
    } else if (name === "username" && value.length <= 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Username should be more than 5 characters",
      }));
    } else if (name === "email" && !value.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Email should include @",
      }));
    } else if (name === "city" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "You must add a city",
      }));
    } else if (name === "zipcode" && !/^[0-9-]+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Zipcode must only be digits or a hyphen",
      }));
    } else if (name === "phone" && !/^\d{10}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "You must add a phone number",
      }));
    }

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    const validationErrors = validate(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(user);
      setUser({
        name: "",
        username: "",
        email: "",
        city: "",
        zipcode: "",
        phone: "",
      });
      setErrors({
        name: "",
        username: "",
        email: "",
        city: "",
        zipcode: "",
        phone: "",
      });
    }
  };

  const validate = (user) => {
    const errors = {};

    if (user.name.trim() === "") {
      errors.name = "Name is required";
    } else if (user.name.length <= 5) {
      errors.name = "Name should be more than 5 characters";
    }

    if (user.username.trim() === "") {
      errors.username = "Username is required";
    } else if (user.username.length <= 5) {
      errors.username = "Username should be more than 5 characters";
    }

    if (user.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(user.email)) {
      errors.email = "Invalid email format";
    }

    if (user.city.trim() === "") {
      errors.city = "You must add a city";
    }

    if (user.zipcode.trim() === "" || !/^[0-9-]+$/.test(user.zipcode)) {
      errors.zipcode = "Zipcode must only be digits or a hyphen";
    }

    if (user.phone.trim() === "" || !/^\d{10}$/.test(user.phone)) {
      errors.phone = "You must add a phone number";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      {errors.username && <p className="error">{errors.username}</p>}

      <label htmlFor="email">Email: </label>
      <input
        type="text"
        id="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="city">City: </label>
      <input
        type="text"
        id="city"
        name="city"
        value={user.city}
        onChange={handleChange}
      />
      {errors.city && <p className="error">{errors.city}</p>}

      <label htmlFor="zipcode">Zipcode: </label>
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        value={user.zipcode}
        onChange={handleChange}
      />
      {errors.zipcode && <p className="error">{errors.zipcode}</p>}

      <label htmlFor="phone">Phone: </label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CreateUser;
