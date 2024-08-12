import React, { useState } from "react";
import Button from "./components/Button";
import "./styling/App.css";
import Input from "./components/Input";
import Info from "./components/Info";
import Solar from "./components/Solar";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (symbol) => {
    if (symbol === "=") {
      calculateResult();
    } else if (symbol === "AC") {
      clearInput();
    } else if (symbol === "C") {
      deleteLast();
    } else if (symbol === "x") {
      setInput((prevInput) => prevInput + "*");
    } else if (symbol === "÷") {
      setInput((prevInput) => prevInput + "/");
    } else {
      setInput((prevInput) => prevInput + symbol);
    }
  };

  const calculateResult = () => {
    try {
      const evaulatedResult = evaluateExpression(input);
      setResult(evaulatedResult.toString());
    } catch (error) {
      setResult("error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const deleteLast = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const evaluateExpression = (expression) => {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    const outputQueue = [];
    const operatorStack = [];

    const tokens = expression.match(/\d+|\+|\-|\*|\//g);

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        outputQueue.push(Number(token));
      } else if (operators[token]) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >=
            precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    const evaluationStack = [];

    outputQueue.forEach((token) => {
      if (typeof token === "number") {
        evaluationStack.push(token);
      } else if (operators[token]) {
        const b = evaluationStack.pop();
        const a = evaluationStack.pop();
        const result = operators[token](a, b);
        evaluationStack.push(result);
      }
    });

    return evaluationStack[0];
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <div className="input">
          <Input />
        </div>
        <div className="info-panel">
          <Info />
        </div>
        <div className="solar-panel"></div>
        <Solar />
        <div className="calc-grid">
          {[
            "%",
            "7",
            "8",
            "9",
            "x",
            "÷",
            "√",
            "4",
            "5",
            "6",
            "-",
            "MR",
            "C",
            "1",
            "2",
            "3",
            "+",
            "M-",
            "AC",
            "0",
            ".",
            "=",
            "M+",
          ].map((symbol) => (
            <Button
              key={symbol}
              symbol={symbol}
              onClick={() => handleButtonClick(symbol)}
              className={symbol === "+" ? "large-button" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
