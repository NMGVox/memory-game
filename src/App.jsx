import { useState, useEffect, useRef } from 'react'
import { collectData } from './modules/collectData';
import Timer from './components/timer'
import './App.css'
import CardGen from './components/CardGen';
import Dimmer from './components/dimmer';
import Results from './components/Results';

function App() {
  const [gameState, setGameState] = useState('prep');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState('');
  let musicData = useRef([]);
  
  function changeDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  function advanceLevel() {
    if(difficulty === 'easy') {
      setDifficulty('med');
    } else {
      setDifficulty('hard');
    }
    setGameState('active');
  }

  function startGame() {
    setLoading(true);
    setGameState('active');
  }

  function gameLost() {
    setGameState('lose');
  }

  function gameWon() {
    setGameState('won');
  }

  function mainMenu() {
    setGameState('prep');
  }

  async function gatherData() {
    try {
      musicData.current = await collectData(difficulty);
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(gameState !== 'active') {
      return;
    }
    gatherData();
  }, [gameState]);

  return (
    <div className='Main'>
      {(gameState === 'prep') && 
      <> 
        <h1 className="gameName">Musical Memory</h1>
        <div className="pickDifficulty">
          <h2 className="containerHeader">Select A Difficulty</h2>
          <div className='buttonContainer'>
            <button style={{backgroundColor: "blue"}} onClick={()=> changeDifficulty('easy')} className='difficulty'>Easy</button>
            <button style={{backgroundColor: "green"}} onClick={()=> changeDifficulty('med')} className='difficulty'>Medium</button>
            <button style={{backgroundColor: "red"}} onClick={()=> changeDifficulty('hard')} className='difficulty'>Hard</button>
          </div>
          {difficulty && <h1>{`You have chosen ${difficulty}!`}</h1>}
          <div className='buttonContainer'>
            <button onClick={startGame} className='difficulty'>Start!</button>
          </div>
        </div> 
      </>
      }
      {
        !loading && gameState === 'active' &&
        <>
          <CardGen 
            musicData={musicData.current}
            gameLost={gameLost}
            gameWon={gameWon}
          />
        </>
      }
      {
        (gameState === 'win' || gameState === 'lose') &&
        <Dimmer>
          <Results
            startGame={startGame} 
            mainMenu={mainMenu}
            advanceLevel={advanceLevel}
            diff={difficulty}
          />
        </Dimmer>
      }
    </div>
  )
}

export default App
