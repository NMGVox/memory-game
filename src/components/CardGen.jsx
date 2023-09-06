import { useState } from "react";

function CardGen({ musicData, gameLost, gameWon }) {
  const [cardsClicked, setCardsClicked] = useState([]);

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
    checkForWin();
    return;
  }


  return (
    <div className="imageGrid">
      {musicData.map((album) => (
        <button onClick={(e) => cardClicked(e, album.id)} key={album.id} className="albumWrapper">
          <img src={album.cover_medium} alt="" />
          <h1>{album.title}</h1>
        </button>
      ))}
    </div>
  )
}

export default CardGen