import styles from "../../../util/StyleUtil";
import colors from "../../../util/ColorUtil";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const Question = ({ question, answers, children }) => {
  return (
    <div className="mb-4">
      <input className={styles.text + "mb-2"} value={question} disabled/>
      { answers.map((answer, i) => (
        <span className="flex mb-2" key={i}>
          <label className="flex items-center justify-center text-sm font-bold  w-10"> {alphabet[i]} </label>
          <input className={styles.text + colors[i % colors.length]} value={answer} disabled/>
        </span>
      ))}
      {children}
    </div>
  )
}

export default Question;