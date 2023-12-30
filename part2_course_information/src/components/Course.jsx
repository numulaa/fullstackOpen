import React from "react";

const Header = ({ title }) => <h2>{title}</h2>;
const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
      <h4>
        Total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{" "}
        exercises
      </h4>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
