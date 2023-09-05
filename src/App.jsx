import { useState, useEffect, useRef } from 'react'
import { collectData } from './modules/collectData';
import Timer from './components/timer'
import './App.css'

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  let musicData = useRef([]);
  
  function changeDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  function startGame() {
    setGameActive(true);
  }

  useEffect(() => {
    if(!gameActive) {
      return;
    }
    musicData.current = collectData(difficulty);
    console.log(musicData.current);
  }, [gameActive]);

  return (
    <div className='Main'>
      <h1 className="gameName">Musical Memory</h1>
      <div className="pickDifficulty">
        <h2 className="containerHeader">Select A Difficulty</h2>
        <div className='buttonContainer'>
          <button style={{backgroundColor: "blue"}} onClick={()=> changeDifficulty('easy')} className='difficulty'>Easy</button>
          <button style={{backgroundColor: "green"}} onClick={()=> changeDifficulty('med')} className='difficulty'>Medium</button>
          <button style={{backgroundColor: "red"}} onClick={()=> changeDifficulty('hard')} className='difficulty'>Hard</button>
        </div>
        {difficulty && <h1>{`You have chosen ${difficulty}!`}</h1>}
        {gameActive && <h1>Game has begun!</h1>}
        <div className='buttonContainer'>
          <button onClick={startGame} className='difficulty'>Start!</button>
        </div>
      </div>
    </div>
  )
}

export default App
