import React, { useState } from "react";

function Title() {
  return <h1>Give Feedback</h1>;
}
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
function StatisticLine({ text, value }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}
function Content({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = ((good + bad * -1) / total).toFixed(2);
  const positive = (good / total).toFixed(2) + " %";
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h3>Statistics</h3>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive} />
    </>
  );
}
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGoodClick() {
    let totalGood = good + 1;
    return setGood(totalGood);
  }
  function handleNeutralClick() {
    let totalNeutral = neutral + 1;
    return setNeutral(totalNeutral);
  }
  function handleBadClick() {
    let totalBad = bad + 1;
    return setBad(totalBad);
  }

  return (
    <>
      <Title />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Content good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
