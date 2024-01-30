/* eslint-disable react/prop-types */
import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = good * (100 / all);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={"good"}></Button>
      <Button handleClick={handleNeutral} text={"neutral"}></Button>
      <Button handleClick={handleBad} text={"bad"}></Button>
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        all={all}
        positive={positive}
      />
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({thing, text}) => {
  return <tr><td>{text}</td> <td>{thing} {text === "positive" ? " %" : ""}</td></tr>
}
const Statistics = ({ good, bad, neutral, average, all, positive }) => {
  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <StatisticsLine thing={good} text={"good"}></StatisticsLine>
      <StatisticsLine thing={neutral} text={"neutral"}></StatisticsLine>
      <StatisticsLine thing={bad} text={"bad"}></StatisticsLine>
      <StatisticsLine thing={all} text={"all"}></StatisticsLine>
      <StatisticsLine thing={average} text={"average"}></StatisticsLine>
      <StatisticsLine thing={positive} text={"positive"}></StatisticsLine>
    </table>
  );
};

export default App;
