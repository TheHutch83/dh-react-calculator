const NumberButton = ({ number, onNumberClick }) => {
  <button onClick={() => onNumberClick(number)}>{number}</button>;
};

export default NumberButton;
