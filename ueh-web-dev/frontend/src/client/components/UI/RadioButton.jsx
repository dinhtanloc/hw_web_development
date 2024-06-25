import "../../styles/radio-button.css";

const RadioButton = ({ name, id, value, onChange, checked, text }) => {
  return (
    <label htmlFor={id} className="radio-label">
      <input
        className="radio-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="custom-radio" />
      {text}
    </label>
  );
};

export default RadioButton;
