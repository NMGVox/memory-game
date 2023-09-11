import vinylIcon from "../img/vinyl.svg";

export default function  SpinnerLoad() {
    return(
        <div className="loadingContainer">
            <img className="icon loadingIcon" src={vinylIcon} alt="Vinyl Loadin anim"/>
            <h1 className="loadingText">Loading...</h1>
        </div>
    )
}