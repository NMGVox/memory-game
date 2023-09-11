export default function HowToPlay({triggerHowTo}) {
    return(
        <div className="tutorialWrapper">
            <div className="tutorial">
                <h3>
                    Click on an album to increase your score! If you click the 
                    same album twice in one round, you lose! Test your memory and 
                    go for a high score and a low time!
                </h3>
                <h3>
                    Your score is saved locally. To reset it, click on the button 
                    containing the letter R.
                </h3>
                <h3>
                    Thank you for playing! This website was designed by NMGVox!
                </h3>
            </div>
            <button onClick={triggerHowTo} className="closeHowTo">x</button>
        </div>
    )
}