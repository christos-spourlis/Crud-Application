import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateUser from "./Components/CreateUser";
import UserList from "./Components/UserList";
import SearchUsers from "./Components/SearchUsers";
import SortUsers from "./Components/SortUsers";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSaveUser = (user) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...user, id: prevUsers.length + 1 },
    ]);
  };

  const handleSearchUsers = (searchTerm) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleSortUsers = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  return (
    <div>
      <CreateUser onSave={handleSaveUser} />
      <SearchUsers onSearch={handleSearchUsers} />
      <SortUsers onSort={handleSortUsers} />
      <UserList users={users} />
    </div>
  );
};

export default App;
