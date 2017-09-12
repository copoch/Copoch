
import React from 'react'

const Home = ({ increment, decrement, incrementIfOdd, incrementAsync, counter }) => (
  <div>
    <p>主页</p>
    <p>
      Clicked: { counter } times
      {' '}
      <button onClick={increment}>+</button>
      {' '}
      <button onClick={decrement}>-</button>
      {' '}
      <button onClick={incrementIfOdd}>Increment If Odd</button>
      {' '}
      <button onClick={() => incrementAsync()}>Increment Async</button>
    </p>
  </div>
)

export default Home
