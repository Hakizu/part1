import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)
const Statistics = (props) => {
  return(
    <p>
      Good {props.good} <br/>
      Neutral {props.neutral} <br/>
      Bad {props.bad} <br/>
    </p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback handleClick={() => setGood(good + 1)} text="Good"/>
      <Feedback handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Feedback handleClick={() => setBad(bad + 1)} text="Neutral"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)