import "../styling/Button.css";

const Button = ({ symbol, className, onClick }) => {
  const memoryButtonClass = ["MR", "M+", "M-"].includes(symbol)
    ? "memory-button"
    : "";

  const cancelButtonClass = ["AC", "C"].includes(symbol) ? "cancel-button" : "";

  return (
    <div
      className={`normal-buttons ${memoryButtonClass} ${cancelButtonClass} ${className}`}
      onClick={() => onClick(symbol)}
    >
      {symbol}
    </div>
  );
};

export default Button;
