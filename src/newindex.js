import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
          {props.course}
      </h1>
    </div>   
  )
}

const Content = (props) => {
  return(
    <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Total exercises {props.total[0].exercises + 
          props.total[1].exercises + 
          props.total[2].exercises}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
        {props.part} {props.exercises}
    </p>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


/*
----------------------------------------------------Anecdotes------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(6).fill(0))
  const votes = [...vote]
  
  const randomNumber = () =>{
    const random = (Math.round(Math.random() * (anecdotes.length - 1)))
    setSelected(random)   
  }

  const voting =(props)=>{
    votes[selected] += 1
    setVote(votes)
    return votes
  }

  const Popular = () =>{
    const highestVote = Math.max(...votes)
    if (highestVote === 0) {
      return <> <h4>Most popular quote right now</h4> 
      <p>No votes yet</p> </>
    }
    
    if (highestVote > 0){
      const currentQuote = votes.indexOf(highestVote)
      return (
        <>
        <h4>Most popular quote right now</h4>
        <p>{anecdotes[currentQuote]} </p>
        </>
      )
    }
  }

  return (
    <div>
      {props.anecdotes[selected]} <br/>
      <button onClick={randomNumber}>next anecdote!</button>
      <button onClick={voting} selected={selected}>Vote for this!</button>
      <Popular/>
    </div>
  )
}

const anecdotes = 
  ['If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.']

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


------------------------------Unicafe --------------------------------------------------
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) =>
    <button onClick={onClick}>
      {text}
    </button>

const Statistic =({text, value}) => 
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>

const Statistics = ({good, neutral, bad}) => {  
  if (good+neutral+bad === 0) {
    return (<>
    <h2>Statistics</h2>
    <p>No Feedback given</p>
    </>)
  }
  if (good+neutral+bad > 0) {
  return(
      <div>
        <h2>Statistics</h2>
        <table><tbody>
      <Statistic text="Good" value ={good}/> 
      <Statistic text="Neutral" value={neutral}/>
      <Statistic text="Bad" value={bad}/> 
      <Statistic text="Average" value={(good * 1 + bad * (-1)) / (good + neutral + bad)}/>
      <Statistic text="Positive" value={good * 100 / (bad+neutral+good) +"%"}/>
       </tbody></table>
      </div>
  )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)

--------------------------------------------------------------------------------------------------
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increasedByOne = () => setCounter(counter + 1)
  const decreasedByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increasedByOne}
      text='Plus'
      />
      <Button handleClick={decreasedByOne}
      text='Minus'
      />
      <Button handleClick={setToZero}
      text='Zero'
      />

    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root')
)

---------------------------------------------------------------------------------

import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const History = (props) =>{
  if (props.allClicks.length === 0) {
     return (
       <div>
         <br/>
         the app is used by pressing the buttons - 
         press all the buttons!!!!
       </div>
     )
  }

  return (
    <div>
      button press history: {props.allClicks.join(" ")}
    </div>
  )
}

const Button =({onClick, text}) =>(
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (Props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"))
    setLeft(left + 1)
  }

  const handleRightClick =() => {
    setAll(allClicks.concat("R"))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="Left" />
        <Button onClick={handleRightClick} text="Right"/> 
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')
)

-------------------------------------------------------------------------------------------
const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = (who) => () =>{console.log('hello', who)}

  return (
    <div>
      {value}
      <button onClick={hello('world')}>
        button S
      </button>
      <button onClick={hello('react')}>
        button Y
      </button>
      <button onClick={hello("function")}>
        button X
      </button>
    </div>
  )
}










*/