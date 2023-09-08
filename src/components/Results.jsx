export default function Results( { mainMenu, startGame, advanceLevel, diff, result } ) {
    return (
        <div className="resultsWrapper">
            <h1 className="resultText">You {result === 'win' ? `won!` : `lost!`}</h1>
            <span className="buttonContainer verticalFlex">
                <button onClick={startGame} className="resultsButton">Restart</button>
                {(diff !== 'hard' && result === 'win') && <button onClick={advanceLevel} className="resultsButton">Next Difficulty</button>}
                <button onClick={mainMenu} className="resultsButton">Main Menu</button>
            </span>
        </div>
    )
}