import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./styling/App.css";
import Input from "./components/Input";
import Info from "./components/Info";
import Solar from "./components/Solar";
import Joi from "joi";

const App = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastAction, setLastAction] = useState(null);

  const inputSchema = Joi.string().max(12).required();

  useEffect(() => {
    localStorage.clear();
    console.log("Local storage cleared on page refresh.");
  }, []);

  const onInputClick = (symbol) => {
    if (!isNaN(symbol) || symbol === ".") {
      if (lastAction === "=" || lastAction === "M+" || lastAction === "M-") {
        setCurrentInput(symbol);

        setLastAction(null);
      } else {
        const newInput = currentInput + symbol;
        const { error } = inputSchema.validate(newInput);
        if (error) {
          setErrorMessage("Input is too long!");
        } else {
          setCurrentInput(newInput);
          setErrorMessage("");
        }
      }
    } else if (symbol === "√") {
      if (currentInput !== "") {
        const inputValue = parseFloat(currentInput);
        if (inputValue < 0) {
          setErrorMessage("Invalid input for square root");
        } else {
          const sqrtValue = Math.sqrt(inputValue).toFixed(10);
          setCurrentInput(sqrtValue);
          setLastAction("√");
          setErrorMessage("");
        }
      }
    } else if (symbol === "%") {
      if (previousValue && operator) {
        const percentageValue =
          parseFloat(previousValue) * (parseFloat(currentInput) / 100);
        const formattedValue = percentageValue.toFixed(10);
        setCurrentInput(formattedValue);
        setLastAction("%");
      }
    } else if (symbol === "MR") {
      const memoryRecall = getFromMemory();
      setCurrentInput(memoryRecall);
      setLastAction("MR");
    } else if (symbol === "M+" || symbol === "M-") {
      const currentValue = parseFloat(currentInput);
      symbol === "M+"
        ? addToMemory(currentValue)
        : subtractFromMemory(currentValue);
      setLastAction(symbol);
    } else if (["+", "-", "x", "÷"].includes(symbol)) {
      setPreviousValue(currentInput);
      setOperator(symbol);
      setCurrentInput("");
      setLastAction(symbol);
    } else if (symbol === "=") {
      if (operator && previousValue != null) {
        const result = calculateResult(
          parseFloat(previousValue),
          parseFloat(currentInput),
          operator
        );
        setCurrentInput(result);
        setPreviousValue(null);
        setOperator(null);
        setLastAction("=");
      }
    } else if (symbol === "C") {
      setCurrentInput("");
      setLastAction(null);
      setErrorMessage("");
    } else if (symbol === "AC") {
      setCurrentInput("");
      setPreviousValue(null);
      setOperator(null);
      setLastAction(null);
      setErrorMessage("");
    }
  };

  const calculateResult = (prev, current, oper) => {
    switch (oper) {
      case "+":
        return (prev + current).toFixed(10);
      case "-":
        return (prev - current).toFixed(10);
      case "x":
        return (prev * current).toFixed(10);
      case "÷":
        if (current === 0) {
          setErrorMessage("Cannot divide by zero");
          return prev;
        }
        return (prev / current).toFixed(10);
      default:
        return current;
    }
  };

  const saveToMemory = (value) => {
    localStorage.setItem("memory", value);
  };

  const getFromMemory = () => {
    const memoryValue = localStorage.getItem("memory");
    return memoryValue || "0";
  };

  const addToMemory = (currentValue) => {
    const memoryValue = parseFloat(getFromMemory());
    const newValue = memoryValue + parseFloat(currentValue);
    saveToMemory(newValue.toString());
  };

  const subtractFromMemory = (currentValue) => {
    const memoryValue = parseFloat(getFromMemory());
    const newValue = memoryValue - parseFloat(currentValue);
    saveToMemory(newValue.toString());
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <div className="input">
          <Input value={currentInput} />
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        <div className="info-panel">
          <Info />
        </div>
        <div className="solar-panel"></div>
        <Solar />
        <div className="calc-grid">
          <Button symbol={"%"} onClick={onInputClick} />
          <Button symbol={"7"} onClick={onInputClick} />
          <Button symbol={"8"} onClick={onInputClick} />
          <Button symbol={"9"} onClick={onInputClick} />
          <Button symbol={"x"} onClick={onInputClick} />
          <Button symbol={"÷"} onClick={onInputClick} />
          <Button symbol={"√"} onClick={onInputClick} />
          <Button symbol={"4"} onClick={onInputClick} />
          <Button symbol={"5"} onClick={onInputClick} />
          <Button symbol={"6"} onClick={onInputClick} />
          <Button symbol={"-"} onClick={onInputClick} />
          <Button symbol={"MR"} onClick={onInputClick} />
          <Button symbol={"C"} onClick={onInputClick} />
          <Button symbol={"1"} onClick={onInputClick} />
          <Button symbol={"2"} onClick={onInputClick} />
          <Button symbol={"3"} onClick={onInputClick} />
          <Button
            symbol={"+"}
            className="large-button"
            onClick={onInputClick}
          />
          <Button symbol={"M-"} onClick={onInputClick} />
          <Button symbol={"AC"} onClick={onInputClick} />
          <Button symbol={"0"} onClick={onInputClick} />
          <Button symbol={"."} onClick={onInputClick} />
          <Button symbol={"="} onClick={onInputClick} />
          <Button symbol={"M+"} onClick={onInputClick} />
        </div>
      </div>
    </div>
  );
};

export default App;

//the memory buttons on the calculator being emulated, does not have a MC function.
// and not can I find a spare button on the interface to use.
// I could make the plus a normal sized button which would free up a spare buttong.
// local storage is therefore being used and stored forever.
//therefore to keep the app looking like the inspiration, I will clear the local storage
// when the app is closed down. I think this is the best approach.
