import { useEffect, useState } from "react";

export default function ScoreWrapper({score, time, difficulty}) {
    let [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        if(difficulty === 'easy') {
            setBackgroundColor("#7899D4");
        } else if (difficulty === 'med') {
            setBackgroundColor("#CBEFB6");
        } else {
            setBackgroundColor("#9B1D20");
        }
    }, [difficulty]);
    
    return (
        <div className='scoreWrapperMain'>
            <span style={{ backgroundColor }}>{`${difficulty.toUpperCase()}`}</span>
            <span>BEST SCORE</span>
            <span>{score}</span>
            <span>BEST TIME</span>
            <span>{time === 'dnf' ? 'DNF' : `${Math.floor(time / 60)} : ${String(time % 60).padStart(2, '0')}`}</span>
        </div>
    )
}