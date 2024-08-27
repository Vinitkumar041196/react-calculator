import {
  useState,
  useRef
} from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState('');
  const [operation, setOperation] = useState('');
  let pointClicked = false;

  function resetInput(e) {
    e.preventDefault();
    inputRef.current.value = null;
  };

  function resetResult(e) {
    e.preventDefault();
    setResult(0);
  };

  function handleNumberClick(e) {
    e.preventDefault();
    if (pointClicked) {
      inputRef.current.value = inputRef.current.value + "." + e.target.innerHTML;
      pointClicked = false;
    } else {
      inputRef.current.value = inputRef.current.value + e.target.innerHTML;
    }
    if (operator === ''){ 
      setOperation(inputRef.current.value);
    }else{
      setOperation(operation +" "+ inputRef.current.value);
    }

  };

  function handlePointClick(e) {
    e.preventDefault();
    pointClicked = true;
  };

  function handleOperatorClick(e) {
    e.preventDefault();
    setOperator(e.target.innerHTML);
    if (result <= 0) {
      setResult(Number(inputRef.current.value));
    }
    setOperation(operation+" "+e.target.innerHTML);
    inputRef.current.value = null;
  };

  function handleEqualsClick(e) {
    e.preventDefault();
    if (Number(inputRef.current.value) <= 0) {
      alert("enter number in input field");
      return;
    }
    let res=0;

    switch (operator) {
      case "+":
        res = result + Number(inputRef.current.value);
        break;
      case "-":
        res = result - Number(inputRef.current.value);
        break;
      case "*":
        res = result * Number(inputRef.current.value);
        break;
      case "/":
        res = result / Number(inputRef.current.value);
        break;
      default:
        alert("select an operator to proceed");
        return;
    }
    setResult(res);
    setOperation(res);
    inputRef.current.value = null;
  };


  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <div className="display">
          <p>{operation}</p>
          <p>{result} =</p>
          <input pattern="[0-9]" ref={inputRef} type="number" placeholder="Type a number" />
        </div>
        <div className="numpad section">
        </div>
        <div className="numpad section">
          <button onClick={handleNumberClick}>7</button>
          <button onClick={handleNumberClick}>8</button>
          <button onClick={handleNumberClick}>9</button>
          <button onClick={handleOperatorClick}>+</button>
        </div>
        <div className="numpad section">
          <button onClick={handleNumberClick}>4</button>
          <button onClick={handleNumberClick}>5</button>
          <button onClick={handleNumberClick}>6</button>
          <button onClick={handleOperatorClick}>-</button>
        </div>
        <div className="numpad section">
          <button onClick={handleNumberClick}>1</button>
          <button onClick={handleNumberClick}>2</button>
          <button onClick={handleNumberClick}>3</button>
          <button onClick={handleOperatorClick}>*</button>
        </div>
        <div className="numpad section">
          <button onClick={handleNumberClick}>0</button>
          <button onClick={handlePointClick}>.</button>
          <button onClick={handleEqualsClick}>=</button>
          <button onClick={handleOperatorClick}>/</button>
        </div>
        <div className="operators">
        </div>
        <div className="reset">
          <button onClick={resetInput}>Clear</button>
          <button onClick={resetResult}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default App; 
