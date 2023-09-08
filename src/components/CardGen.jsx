import { useState, useEffect, useRef } from "react";
import vinylIcon from "../img/vinyl.png";
import timeIcon from "../img/time.png";
import Timer from "./timer";

function CardGen({ musicData, gameLost, gameWon, gridSize }) {
  const [cardsClicked, setCardsClicked] = useState([]);
  const [counter, setCounter] = useState(0);
  //const shuffleData = useRef(musicData);
  const [shuffleData, setShuffleData] = useState([]);
  const [flipStatus, setFlipStatus] = useState('normal');
  const [shuffleFlag, setShuffleFlag] = useState(0);

  useEffect(() => {
    setShuffleData(musicData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value));
  }, [shuffleFlag]);

  useEffect(() => {
    checkForWin();
  }, [counter]);

  function checkForWin() {
    if(counter === musicData.length) {
      gameWon();
    }
  }

  async function cardClicked(e, cardId) {
    if(cardsClicked.includes(cardId)) {
      gameLost();
      return;
    }
    setCounter(prevCounter => prevCounter +1);
    setFlipStatus('flipping');
    await new Promise(resolve => setTimeout(resolve, 800));
    setFlipStatus('normal');
    setCardsClicked(prevClicked => [...prevClicked, cardId]);
    
    setShuffleFlag(prevFlag => prevFlag +1);
    return;
  }

  return (
    <div className="gameArea">
      <div className="gameInfo">
        <span className="score">
          <img className='icon' src={vinylIcon} alt="Vinyl" />
          {`${counter} / ${musicData.length}`}
        </span>
        <span className="timerContainer">
          <img className='icon' src={timeIcon} alt="Time Icon"/>
          <Timer/>
        </span>
      </div>
      <div style={{gridTemplateColumns: `${gridSize}`}} className="imageGrid">
        {shuffleData.map((album) => (
          <button disabled={flipStatus === 'flipping' ? true : false} onClick={(e) => cardClicked(e, album.id)} key={album.id} className={`albumWrapper ${flipStatus === 'flipping' ? 'flip': ''}`}>
            <img className="albumCover" src={album.cover_medium} alt="" />
            <h1>{album.title.replace(/ *\([^)]*\) */g, "")}</h1>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CardGen