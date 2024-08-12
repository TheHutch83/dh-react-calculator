import "../styling/Input.css";

const Input = ({ value }) => {
  return (
    <div className="result-container">
      <div className="result-screen">{value}</div>
    </div>
  );
};

export default Input;
