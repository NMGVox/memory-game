import { useState, useEffect, useRef } from 'react'
import { collectData } from './modules/collectData';
import Timer from './components/timer'
import './App.css'
import CardGen from './components/CardGen';
import Dimmer from './components/dimmer';
import Results from './components/Results';
import { JellyTriangle } from '@uiball/loaders';

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
    startGame();
  }

  function startGame() {
    setLoading(true);
    setGameState('active');
  }

  function gameLost() {
    setGameState('lose');
  }

  function gameWon() {
    setGameState('win');
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

  function determineGridSize() {
    if(difficulty === 'med') {
      return 'repeat(4, 1fr)';
    } else if(difficulty === 'hard') {
      return 'repeat(6, 1fr)';
    } 
    return 'repeat(3, 1fr)';
  }

  let gridSize = determineGridSize();

  return (
    <div className='Main'>
      {(gameState === 'prep') && 
      <> 
        <h1 className="gameName">ALBUM COVER MEMORY</h1>
        <div className="pickDifficulty">
          <h2 className="containerHeader">SELECT A DIFFICULTY</h2>
          <div className='buttonContainer'>
            <button style={{backgroundColor: "#7899D4"}} onClick={()=> changeDifficulty('easy')} className='difficulty'>EASY</button>
            <button style={{backgroundColor: "#CBEFB6"}} onClick={()=> changeDifficulty('med')} className='difficulty'>MEDIUM</button>
            <button style={{backgroundColor: "#9B1D20"}} onClick={()=> changeDifficulty('hard')} className='difficulty'>HARD</button>
          </div>
          {difficulty && <h1>{`You have chosen ${difficulty}!`}</h1>}
          <div className='buttonContainer'>
            <button onClick={startGame} style={{backgroundColor: "#1f0e29", color:"white"}} className='difficulty start'>START!</button>
          </div>
        </div> 
      </>
      }
      {loading && <JellyTriangle size={75} color="#9b8ea3"/>}
      {
        !loading && gameState === 'active' &&
        <>
          <CardGen 
            musicData={musicData.current}
            gameLost={gameLost}
            gameWon={gameWon}
            gridSize={gridSize}
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
            result={gameState}
          />
        </Dimmer>
      }
    </div>
  )
}

export default App
