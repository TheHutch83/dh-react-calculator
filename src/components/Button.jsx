import "../styling/Button.css";

const Button = ({ symbol, className }) => {
  const memoryButtonClass = ["MR", "M+", "M-"].includes(symbol)
    ? "memory-button"
    : "";

  const cancelButtonClass = ["AC", "C"].includes(symbol) ? "cancel-button" : "";

  return (
    <div
      className={`normal-buttons ${memoryButtonClass} ${cancelButtonClass} ${className}`}
    >
      {symbol}
    </div>
  );
};

export default Button;
