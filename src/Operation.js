import { ACTIONS } from "./App.js"

export default function Operation({ dispatch, operation, className, id }) {
    return (
        <button 
            className= { className }
            id = { id }
            onClick={() => dispatch({ action: ACTIONS.CHOOSE_OPERATION, actionParameter: { operation }})}
        >
            { operation }
        </button>)
}