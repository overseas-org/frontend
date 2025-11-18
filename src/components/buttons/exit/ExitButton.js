import "./ExitButton.css"

function ExitButton({ onClick }) {
    return (
        <button className="exit-button" onClick={onClick}>X</button>
    )
}

export default ExitButton;