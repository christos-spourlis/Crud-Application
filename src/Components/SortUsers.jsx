import React from "react";

const SortUsers = ({ onSort }) => {
  const handleSort = () => {
    onSort();
  };

  return (
    <div>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
};

export default SortUsers;
