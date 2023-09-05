import { useState, useEffect, useRef } from 'react'
import { collectData } from './modules/collectData';
import Timer from './components/timer'
import './App.css'

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState('');
  let musicData = useRef([]);
  
  function changeDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  function startGame() {
    setGameActive(true);
  }

  async function gatherData() {
    try {
      musicData.current = await collectData(difficulty);
      setLoading(false);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!gameActive) {
      return;
    }
    setLoading(true);
    gatherData();
  }, [gameActive]);

  return (
    <div className='Main'>
      {!gameActive && <> <h1 className="gameName">Musical Memory</h1>
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
      </div> </>}
    </div>
  )
}

export default App
