import styles from "../../../util/StyleUtil";
const roundButtonStyle = styles.hover.blue + "flex items-center justify-center text-gray-50 font-bold rounded-full bg-blue-400 w-6 h-6 mx-2";

/*
  Answer form with a single text input and an action button
    - @param {type} add/remove type to show appropriate button
    - @param {index} arbitrary index of answer -- used to keep track of array position
    - @param {onChange} function called with text input value when value changes
    - @param {onSubmit} function called with text input valuew when form submitted
    - @param {disabled} boolean to disable to text field
*/
const AnswerForm = ({ type, index, value, onChange, onSubmit, disabled }) => {
  const handleChange = (event) => {
    if(onChange) onChange(event.currentTarget.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(value.length > 0 && onSubmit) onSubmit(value, index);
  }

  return (
    <form className="flex items-center mb-2" onSubmit={handleSubmit}>
      { type === "add" ?
        <button className={roundButtonStyle} type="submit"> + </button>
        :
        <button className={roundButtonStyle} type="submit"> - </button>
      }
      <input 
        className={styles.text} 
        type="text" 
        placeholder="Answer"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </form>
  )
}

export default AnswerForm;