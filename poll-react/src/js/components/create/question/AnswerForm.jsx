import styles from "../../../util/StyleUtil";
const blueButton = styles.hover.blue + "flex items-center justify-center text-gray-50 font-bold rounded-full bg-blue-400 w-6 h-6 mx-2";
const redButton = styles.hover.red + "flex items-center justify-center text-gray-50 font-bold rounded-full bg-red-400 w-6 h-6 mx-2";

/*
  Answer form with a single text input and an action button
    - @param {type} add/remove type to show appropriate button
    - @param {index} arbitrary index of answer -- used to keep track of array position
    - @param {onChange} function called with text input value when value changes
    - @param {onSubmit} function called with text input valuew when form submitted
    - @param {disabled} boolean to disable to text field
    - @param {tabIndex} tabIndex attribute
*/
const AnswerForm = ({ type, index, value, onChange, onSubmit, disabled, tabIndex }) => {
  const handleChange = (event) => {
    if(onChange) onChange(event.currentTarget.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(value.length > 0 && onSubmit) onSubmit(value, parseInt(index));
  }

  return (
    <form className="flex items-center mb-2" onSubmit={handleSubmit}>
      { type === "add" ?
        <button className={blueButton} type="submit"> + </button>
        :
        <button className={redButton} type="submit"> - </button>
      }
      <input 
        className={styles.text} 
        type="text" 
        placeholder="Answer"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        tabIndex={tabIndex}
      />
    </form>
  )
}

export default AnswerForm;