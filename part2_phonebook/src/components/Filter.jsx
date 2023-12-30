import React from "react";

const Filter = ({ searchVar, handleSearch }) => {
  return (
    <form>
      <label htmlFor="nameSearch">Filter shown with: </label>
      <input
        type="search"
        id="nameSearch"
        value={searchVar}
        onChange={handleSearch}
      />
    </form>
  );
};

export default Filter;
