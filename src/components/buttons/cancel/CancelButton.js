import "./CancelButton.css"

function CancelButton({ onClick }) {
    return (
        <button className="cancel-button" onClick={onClick}>cancel</button>
    )
}

export default CancelButton;