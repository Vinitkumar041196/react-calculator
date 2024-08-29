import { useState, useRef } from "react";

import "./App.css";
import Display from "./components/Display"
import History from "./components/History";
import Button from "./components/Button";

function App() {
  const inputRef = useRef(null);
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [operationHist, setOperationHist] = useState(['']);
  let pointClicked = false;
  
  function setOperationLog(caller,op, curInVal, res, finalRes){
    console.log("caller",caller);
    op = op===undefined ? operator : op;
    curInVal = curInVal===undefined ? inputRef.current.value : curInVal;
    res = res===undefined ? result : res;
    finalRes = finalRes===undefined?'':finalRes;

    curInVal = curInVal===null ? '' : curInVal;
    // res = finalRes === '' ? '' : res;
    
    console.log("curinval",curInVal);
    console.log("op",op);
    console.log("res",res);
    console.log("finres",finalRes);
    
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
    operationHist[operationHist.length-1]='';
    setOperationHist(operationHist);
  };

  function resetResult(e) {
    e.preventDefault();
    setResult('');
    setOperationHist(['']);
  };

  function handleNumberClick(e) {
    e.preventDefault();
    if (pointClicked) {
      inputRef.current.value = inputRef.current.value + "." + e.target.innerHTML;
      pointClicked = false;
    } else {
      inputRef.current.value = inputRef.current.value + e.target.innerHTML;
    }
    setOperationLog('handleNumberClick');
  };

  function handlePointClick(e) {
    e.preventDefault();
    pointClicked = true;
  };

  function handleOperatorClick(e) {
    e.preventDefault();
    setOperator(e.target.innerHTML);
    if (inputRef.current.value !==''){
      setResult(Number(inputRef.current.value));
      setOperationLog('handleOperatorClick if', e.target.innerHTML, Number(inputRef.current.value), '');
      inputRef.current.value = null;
    }else{
      setOperationLog('handleOperatorClick else', e.target.innerHTML);
    }
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
    setOperationLog('handleEqualsClick',operator,inputRef.current.value,result,res);
    inputRef.current.value = null;
  };


  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <fieldset>
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
        </fieldset>
      </form>
    </div>
  );
}

export default App; 
