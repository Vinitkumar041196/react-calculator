import {
  useState,
  useRef
} from "react";
import "./App.css";

function Button(props){
    return (<button onClick={props.func}>{props.text}</button>)
}

function History(props){
  const histOps = props.opArr.map((op,i) => {
    return (
        <li key={String(i+1)}>{op}</li>
    );
  });
  return (
    <div>History:<br/>
      <ul className="opHist">
        {histOps}
      </ul>
    </div>
  );
}

function Display(props){
  return (
    <div className="display">
      <p>{props.res} =</p>
      <input pattern="[0-9]" ref={props.inref} type="number" placeholder="Type a number" />
    </div>
  );
}

function App() {
  const inputRef = useRef(null);
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [operationHist, setOperationHist] = useState(['']);
  let pointClicked = false;
  
  function setOperationLog(op, curInVal, res, finalRes){
    op = op===undefined ? operator : op;
    curInVal = curInVal===undefined ? inputRef.current.value : curInVal;
    res = res===undefined ? result : res;
    finalRes = finalRes===undefined?'':finalRes;

    curInVal = curInVal===null ? '' : curInVal;
    res = op==='' ? '' : res;
    
    if (res===''){
      operationHist[operationHist.length-1]=`${curInVal} ${op}`;
    }else{
      operationHist[operationHist.length-1]=`${res} ${op} ${curInVal} = ${finalRes}`;
    }
    if (finalRes!==''){
      operationHist.push('');
    }
    setOperationHist(operationHist);
  }

  function resetInput(e) {
    e.preventDefault();
    inputRef.current.value = null;
  };

  function resetResult(e) {
    e.preventDefault();
    setResult('');
  };

  function handleNumberClick(e) {
    e.preventDefault();
    if (pointClicked) {
      inputRef.current.value = inputRef.current.value + "." + e.target.innerHTML;
      pointClicked = false;
    } else {
      inputRef.current.value = inputRef.current.value + e.target.innerHTML;
    }
    setOperationLog();
  };

  function handlePointClick(e) {
    e.preventDefault();
    pointClicked = true;
  };

  function handleOperatorClick(e) {
    e.preventDefault();
    setOperator(e.target.innerHTML);
    setResult(Number(inputRef.current.value));
    setOperationLog(e.target.innerHTML,Number(inputRef.current.value),'');
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
      case '':
        res = Number(inputRef.current.value);
        break;
      default:
        alert("select an operator to proceed");
        return;
    }
    setResult(res);
    setOperationLog(operator,inputRef.current.value,result,res);
    inputRef.current.value = null;
  };


  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <Display res={result} inref={inputRef} />
        <div className="numpad section">
          <Button func={handleNumberClick} text="7"/>
          <Button func={handleNumberClick} text="8"/>
          <Button func={handleNumberClick} text="9"/>
          <Button func={handleOperatorClick} text="+"/>
        </div>
        <div className="numpad section">
          <Button func={handleNumberClick} text="4"/>
          <Button func={handleNumberClick} text="5"/>
          <Button func={handleNumberClick} text="6"/>
          <Button func={handleOperatorClick} text="-"/>
        </div>
        <div className="numpad section">
          <Button func={handleNumberClick} text="1"/>
          <Button func={handleNumberClick} text="2"/>
          <Button func={handleNumberClick} text="3"/>
          <Button func={handleOperatorClick} text="*"/>
        </div>
        <div className="numpad section">
          <Button func={handleNumberClick} text="0"/>
          <Button func={handlePointClick} text="."/>
          <Button func={handleEqualsClick} text="="/>
          <Button func={handleOperatorClick} text="/"/>
        </div>
        <div className="reset">
          <Button func={resetInput} text="Clear"/>
          <Button func={resetResult} text="Reset"/>
        </div>
        <History opArr={operationHist} />
      </form>
    </div>
  );
}

export default App; 
