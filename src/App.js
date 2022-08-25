//Calculator state logic from https://www.youtube.com/watch?v=DgRrrOt0Vr8&t=576s

import { useReducer } from "react";
import Digit from "./Digit";
import Operation from "./Operation";
import "./styles.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, { action, actionParameter }) {
  
  if(state.currentOperand === 0) {
    state.currentOperand = ""
  }

  switch(action) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: actionParameter.digit,
          overwrite: false,
        }
      }
      if (actionParameter.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (actionParameter.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${actionParameter.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand ==  null) {
        return {
          ...state,
          operation: actionParameter.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: actionParameter.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: actionParameter.operation,
        currentOperand: null
      }
      
    case ACTIONS.CLEAR:
      return {currentOperand: 0, previousOperand: null, operation: null}
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    default: 
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) {
    return ""
  }
  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    default:
  }
  return computation.toString()
}

function App() {

  const initialState = {currentOperand: 0, previousOperand: null, operation: null}

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
    reducer, 
    initialState
  )

  return (

    <div className="calculator-container">
      <div className="calculator-output" id="display">
        <div className="previous">{previousOperand} {operation}</div>
        <div className="current">{currentOperand}</div>
      </div>

      <button className="clear" id="clear" onClick={() => dispatch({ action: ACTIONS.CLEAR })}>AC</button> 

      <Operation className={"operator"} id="divide" operation={"/"} dispatch={dispatch}/>
      <Operation className={"operator"} id="multiply" operation={"*"} dispatch={dispatch}/>
      <Operation className={"operator"} id="subtract" operation={"-"} dispatch={dispatch}/>
      <Operation className={"operator"} id="add" operation={"+"} dispatch={dispatch}/>
      
      
      <button className="operator" id="equals" onClick={() => dispatch({ action: ACTIONS.EVALUATE })}>=</button>

      <Digit className={"operand"} id={"one"} digit={"1"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"two"} digit={"2"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"three"} digit={"3"} dispatch={dispatch}/>  
      <Digit className={"operand"} id={"four"} digit={"4"} dispatch={dispatch}/>
      
      <Digit className={"operand"} id={"five"} digit={"5"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"six"} digit={"6"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"seven"} digit={"7"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"eight"} digit={"8"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"nine"} digit={"9"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"zero"} digit={"0"} dispatch={dispatch}/>
      <Digit className={"operand"} id={"decimal"} digit={"."} dispatch={dispatch}/>
    </div>
   
  );
}

export default App;
