import React, { useState } from "react";
import Button from "./components/Button";
import "./styling/App.css";
import Input from "./components/Input";
import Info from "./components/Info";
import Solar from "./components/Solar";
import Joi from "joi";

const App = () => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputSchema = Joi.string().max(12).required();

  const onInputClick = (symbol) => {
    console.log(`Button clicked: ${symbol}`); // test to make sure the button press is recognised
    const newInput = input + symbol;
    const { error } = inputSchema.validate(newInput);
    if (error) {
      setErrorMessage("Input is too long!");
    } else setInput(newInput);
    setErrorMessage("");
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <div className="input">
          <Input value={input} />
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
