import React from "react";
import Button from "./components/Button";
import "./styling/App.css";
import Input from "./components/Input";
import Info from "./components/Info";

const App = () => {
  return (
    <div className="app">
      <div className="calculator">
        <div>
          <Input />
        </div>
        <div className="info-panel">
          <Info />
        </div>
        <div className="solar-panel"></div>
        <div className="calc-row">
          <Button symbol={"%"} />
          <Button symbol={"7"} />
          <Button symbol={"8"} />
          <Button symbol={"9"} />
          <Button symbol={"x"} />
          <Button symbol={"÷"} />
        </div>
        <div className="calc-row">
          <Button symbol={"√"} />
          <Button symbol={"4"} />
          <Button symbol={"5"} />
          <Button symbol={"6"} />
          <Button symbol={"-"} />
          <Button symbol={"MR"} />
        </div>
        <div className="calc-row">
          <Button symbol={"C"} />
          <Button symbol={"1"} />
          <Button symbol={"2"} />
          <Button symbol={"3"} />
          <Button symbol={"+"} />
          <Button symbol={"M-"} />
        </div>
        <div className="calc-row">
          <Button symbol={"AC"} />
          <Button symbol={"0"} />
          <Button symbol={"."} />
          <Button symbol={"="} />
          <Button symbol={"+"} />
          <Button symbol={"M+"} />
        </div>
      </div>
    </div>
  );
};

export default App;
