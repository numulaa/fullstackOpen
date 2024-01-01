import React from "react";

const ContentList = ({ country, handleShowView }) => {
  return (
    <div className="content-list">
      <p key={country.name.common}>{country.name.common} </p>
      <button onClick={() => handleShowView(country)}>Show</button>
    </div>
  );
};

export default ContentList;
