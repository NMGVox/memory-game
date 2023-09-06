import { useState, useEffect, useRef } from "react";

function CardGen({ musicData, gameLost, gameWon }) {
  const [cardsClicked, setCardsClicked] = useState([]);
  const [counter, setCounter] = useState(0);
  const shuffleData = useRef(musicData);

  useEffect(() => {
    shuffleData.current = musicData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }, [counter]);

  function checkForWin() {
    if(cardsClicked.length === musicData.length) {
      gameWon();
    }
  }

  function cardClicked(e, cardId) {
    if(cardsClicked.includes(cardId)) {
      gameLost();
      return;
    }
    const tempClicked = cardsClicked;
    tempClicked.push(cardId);
    setCardsClicked(tempClicked);
    setCounter(counter + 1);
    checkForWin();
    return;
  }


  return (
    <div className="imageGrid">
      {shuffleData.current.map((album) => (
        <button onClick={(e) => cardClicked(e, album.id)} key={album.id} className="albumWrapper">
          <img src={album.cover_medium} alt="" />
          <h1>{album.title}</h1>
        </button>
      ))}
    </div>
  )
}

export default CardGen