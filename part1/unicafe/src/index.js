import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  return (
    <h1>{props.header}</h1>
  )
}

const Button = props => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const Statistic = props => {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.amount}</td>
    </tr>
  )
}

const Statistics = props => {
  return (
    <table>
      <tbody>
        <Statistic title="good" amount={props.good} />
        <Statistic title="neutral" amount={props.neutral} />
        <Statistic title="bad" amount={props.bad} />
        <Statistic title="all" amount={props.total} />
        <Statistic title="average" amount={props.average} />
        <Statistic title="positive" amount={props.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = (good / total) * 100 + '%'

  return (
    <div>
      <Header header="give feedback" />
      <Button name="good" onClick={() => setGood(good + 1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setBad(bad + 1)} />
      <Header header="statistics" />
      {good || neutral || bad ? <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} /> : "No feedback given" }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)