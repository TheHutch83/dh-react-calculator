const OperatorButton = ({ operator, onOperatorClick }) => {
  <button onClick={() => onOperatorClick(operator)}>{operator}</button>;
};
export default OperatorButton;
