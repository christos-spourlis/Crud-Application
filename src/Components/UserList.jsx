import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name} | <strong>Email:</strong>{" "}
            {user.email} <strong>Phone:</strong> {user.phone}{" "}
            <strong>Username:</strong> {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
