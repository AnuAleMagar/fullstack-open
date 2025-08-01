import React from "react";
import StatisticLine from "./StatisticLine";
function Statistic({ good, bad, neutral }) {
  return (
    <>
        <StatisticLine text='all' value={bad + good + neutral} />
        <StatisticLine text='average' value={(-bad + good) / (bad + good + neutral)} />
        <StatisticLine text='positive' value={(good / (bad + good + neutral)) * 100} />
    </>
  );
}

export default Statistic;
