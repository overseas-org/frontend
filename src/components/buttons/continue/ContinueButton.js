import "./ContinueButton.css"

function ContinueButton({ onClick=()=>{}, text="continue →" }) {
    return (
        <button type="submit" className="continue-button" onClick={onClick}>{text}</button>
    )
}

export default ContinueButton;