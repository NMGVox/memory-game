import { useState, useEffect } from 'react'
import { dataList as albums }  from './data/data'
// import Timer from './components/timer'
import './App.css'

function App() {
  const [gameActive, setGameActive] = useState(false);
  
  function startGame(e, difficulty) {
    setGameActive(true);
  }

  return (
    <div className='Main'>
      <h1 className="gameName">Musical Memory</h1>
      <div className="pickDifficulty">
        <h2 className="containerHeader">Select A Difficulty</h2>
        <div className='buttonContainer'>
          <button onClick={(e)=> startGame(e, 'easy')} className='difficulty'>Easy</button>
          <button onClick={(e)=> startGame(e, 'med')} className='difficulty'>Medium</button>
          <button onClick={(e)=> startGame(e, 'hard')} className='difficulty'>Hard</button>
        </div>
      </div>
    </div>
  )
}

export default App
