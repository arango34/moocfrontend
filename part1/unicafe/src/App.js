import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const average = () => {
    if (good === 0 && bad === 0) return 0;
    return (bad * -1 + good) / (good + bad + neutral);
  };

  const positive = () => {
    if (good === 0) return 0;
    return (100 * good) / (good + bad + neutral);
  };

  const handleGoodClick = () => setGood(good + 1);

  const handleBadClick = () => setBad(bad + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
      />
    </div>
  );
}

const Statistics = ({ good, neutral, bad, average, positive }) => (
  <>
    <h1>statistics</h1>
    {good + bad + neutral === 0 && <p>No feedback given</p>}
    {good + bad + neutral > 0 && (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + bad + neutral} />
          <StatisticLine text='average' value={average()} />
          <StatisticLine text='positive' value={positive() + ' %'} />
        </tbody>
      </table>
    )}
  </>
);

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App;
