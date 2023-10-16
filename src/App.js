/* eslint-disable no-eval */
import { useState } from "react";
import "./App.css";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const ops = ["/", "*", "-", "+", "."];
  const updateCalc = (value) => {
    if (ops.includes(value) && calc === "") {
      return;
    } else if (ops.includes(value) && ops.includes(calc.slice(-1))) {
      const v = calc.slice(0, -1);
      setCalc(v + value);
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };
  const createDigits = () => {
    const digits = [];
    for (let index = 1; index < 10; index++) {
      digits.push(
        <button onClick={() => updateCalc(index.toString())} key={index}>
          {index}
        </button>
      );
    }
    return digits;
  };
  const calculate = () => {
    if (!ops.includes(calc.slice(-1))) {
      const v = eval(calc).toString();
      setResult(v);
      setCalc(v);
    }
  };
  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };
  const clearAll = () => {
    setCalc("");
    setResult("");
  };
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span className="span1">{result}</span> : ""}
          &nbsp;
          {calc ? <span>{calc}</span> : "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("+")}> &#43;</button>
          <button onClick={() => updateCalc("*")}>&#215;</button>
          <button onClick={deleteLast}>&#x2190;</button>
          <button onClick={() => updateCalc("-")}>&#8722; </button>
          <button onClick={() => updateCalc("/")}>&#247;</button>
          <button onClick={clearAll}>AC</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;