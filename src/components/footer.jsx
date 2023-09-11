import GitHubIcon from "../img/github.svg";
import QuestionMark from '../img/Question.svg';
import { useState } from "react";
import HowToPlay from "./HowToPlay";
import Dimmer from "./dimmer";
import ResetIcon from '../img/reset.svg';

export default function Footer({resetScores}) {
    const [howToActive, setHowToActive] = useState(false);

    function triggerHowTo() {
        setHowToActive((prev) => (!prev));
    }

    return (
        <div className="footer">
            <button className="footerButton" title="Reset Local Scores" onClick={resetScores}>
                <img className="footerLink" src={ResetIcon} alt="How To Play Button" />
            </button>
            <a title="Source Code" href="https://github.com/NMGVox/memory-game">
                <img className="footerLink" src={GitHubIcon} alt="Github Link" />
            </a>
            <button className="footerButton" title="How To Play" onClick={triggerHowTo}>
                <img className="footerLink" src={QuestionMark} alt="How To Play Button" />
            </button>
            {howToActive && 
                <Dimmer>
                    <HowToPlay
                        triggerHowTo={triggerHowTo}
                    />
                </Dimmer>
            }
        </div>
    )
}