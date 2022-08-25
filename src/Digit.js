import { ACTIONS } from "./App.js"

export default function Digit({ dispatch, digit, className, id }) {
    return (
        <button 
            className= { className }
            id = { id }
            onClick={() => dispatch({ action: ACTIONS.ADD_DIGIT, actionParameter: { digit }})}
        >
            { digit }
        </button>)
}