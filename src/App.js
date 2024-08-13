import React, { useState } from "react";
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
  const [display, setDisplay] = useState("");

  const inputSchema = Joi.string().max(12).required();

  const onInputClick = (symbol) => {
    if (!isNaN(symbol) || symbol === ".") {
      if (lastAction === "=") {
        setCurrentInput(symbol);
        setDisplay(symbol);
        setLastAction(null);
      } else {
        const newInput = currentInput + symbol;
        const { error } = inputSchema.validate(newInput);
        if (error) {
          setErrorMessage("Input is too long!");
        } else {
          setCurrentInput(newInput);
          setDisplay(newInput);
          setErrorMessage("");
        }
      }
    } else if (symbol === "√") {
      if (currentInput !== "") {
        const inputValue = parseFloat(currentInput);
        if (inputValue < 0) {
          setErrorMessage("Invalid input for square root");
          setDisplay("Error");
        } else {
          const sqrtValue = Math.sqrt(inputValue).toFixed(10);
          setCurrentInput(sqrtValue);
          setDisplay(sqrtValue);
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
        setDisplay(formattedValue);
        setLastAction("%");
      }
    } else if (["+", "-", "x", "÷"].includes(symbol)) {
      setPreviousValue(currentInput);
      setOperator(symbol);
      setCurrentInput("");
      setDisplay("");
      setLastAction(symbol);
    } else if (symbol === "=") {
      if (operator && previousValue != null) {
        const result = calculateResult(
          parseFloat(previousValue),
          parseFloat(currentInput),
          operator
        );
        setCurrentInput(result);
        setDisplay(result);
        setPreviousValue(null);
        setOperator(null);
        setLastAction("=");
      }
    } else if (symbol === "C") {
      setCurrentInput("");
      setDisplay("");
      setLastAction(null);
      setErrorMessage("");
    } else if (symbol === "AC") {
      setCurrentInput("");
      setDisplay("");
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
