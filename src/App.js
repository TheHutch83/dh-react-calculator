import React from "react";
import Button from "./components/Button";
import "./styling/App.css";
import "./styling/Button.css";
import Input from "./components/Input";
import Info from "./components/Info";

const App = () => {
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
        <div className="calc-grid">
          <Button symbol={"%"} />
          <Button symbol={"7"} />
          <Button symbol={"8"} />
          <Button symbol={"9"} />
          <Button symbol={"x"} />
          <Button symbol={"÷"} />
          <Button symbol={"√"} />
          <Button symbol={"4"} />
          <Button symbol={"5"} />
          <Button symbol={"6"} />
          <Button symbol={"-"} />
          <Button symbol={"MR"} />
          <Button symbol={"C"} />
          <Button symbol={"1"} />
          <Button symbol={"2"} />
          <Button symbol={"3"} />
          <Button symbol={"+"} className="large-button" />
          <Button symbol={"M-"} />
          <Button symbol={"AC"} />
          <Button symbol={"0"} />
          <Button symbol={"."} />
          <Button symbol={"="} />
          <Button symbol={"M+"} />
        </div>
      </div>
    </div>
  );
};

export default App;
