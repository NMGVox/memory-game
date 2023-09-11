import { useState, useEffect, useRef } from 'react'
import { collectData } from './modules/collectData';
import './App.css'
import CardGen from './components/CardGen';
import Dimmer from './components/dimmer';
import Results from './components/Results';
import { JellyTriangle } from '@uiball/loaders';
import ScoreWrapper from './components/scoreWrapper';
import SpinnerLoad from './components/loadingScreen';
import Footer from './components/footer';

function App() {
  const [gameState, setGameState] = useState('prep');
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState('');
  const [highScores, setHighScores] = useState({
    "easy": {score: 0, time: 'dnf',},
    "med": {score: 0, time: 'dnf',},
    "hard": {score: 0, time: 'dnf',},
  });

  let musicData = useRef([]);

  useEffect(() => {
    let temp = window.localStorage.getItem('scores');
    let parsedTemp = JSON.parse(temp);
    if(parsedTemp !== null) {
      setHighScores(parsedTemp);
    }
  }, []);

  function resetScores() {
    window.localStorage.setItem('scores', null);
  }

  function saveScores() {
    setHighScores((prevHighScores) => {
      window.localStorage.setItem('scores', JSON.stringify(prevHighScores));
      return prevHighScores;
    })
  }

  function updateTime(time, s) {
    if (s === 'w' && (highScores[difficulty].time === 'dnf' || time < highScores[difficulty].time )) {
      setHighScores((prevHighScores) => ({
        ...prevHighScores,
        [difficulty] : {
          ...prevHighScores[difficulty],
          time: time,
        },
      }));
    } 
  }

  function updateScore(score) {
    if( score > highScores[difficulty].score ) {
      setHighScores((prevHighScores) => ({
        ...prevHighScores,
        [difficulty] : {
          ...prevHighScores[difficulty],
          score: score,
        },
      }));
    }
  }
  
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

  function gameLost(score, time) {
    setGameState('lose');
    updateScore(score);
    saveScores();
  }

  function gameWon(score, time) {
    setGameState('win');
    updateScore(score, time, 'w');
    updateTime(time, 'w')
    saveScores();
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
          {difficulty && 
            <ScoreWrapper
              time = {highScores[difficulty].time}
              score = {highScores[difficulty].score}
              difficulty = {difficulty}
            />
          }
          <div className='buttonContainer'>
            <button onClick={startGame} style={{backgroundColor: "#1f0e29", color:"white"}} className='difficulty start'>START!</button>
          </div>
        </div> 
      </>
      }
      {loading && <SpinnerLoad/>}
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
      {gameState === "prep" && 
        <Footer
          resetScores={resetScores}
        />
      }
    </div>
  )
}

export default App
