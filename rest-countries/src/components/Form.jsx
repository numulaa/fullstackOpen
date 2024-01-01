import React from "react";

const Form = ({ varSearch, handleChange }) => {
  return (
    <>
      <p>Find countries</p>
      <form>
        <input type="text" value={varSearch} onChange={handleChange} />
      </form>
    </>
  );
};

export default Form;
