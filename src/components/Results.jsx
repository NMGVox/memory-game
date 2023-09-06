export default function Results( { mainMenu, startGame, advanceLevel, diff } ) {
    console.log(diff);
    return (
        <div className="resultsWrapper">
            <h1 className="resultText">You X!</h1>
            <span className="buttonContainer verticalFlex">
                <button onClick={startGame} className="resultsButton">Restart</button>
                {(diff !== 'hard') && <button onClick={advanceLevel} className="resultsButton">Next Difficulty</button>}
                <button onClick={mainMenu} className="resultsButton">Main Menu</button>
            </span>
        </div>
    )
}