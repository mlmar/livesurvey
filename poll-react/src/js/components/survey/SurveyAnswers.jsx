import styles from '../../util/StyleUtil';
import { base } from '../../util/ColorUtil';

const getStyle = (bg) => (
  `${bg}-200 appearance-none text-gray-700 font-bold rounded px-4 py-1 focus:outline-none h-12 mb-2 ` + 
  `hover:${bg}-300 ` + 
  `disabled:${bg}-100 disabled:hover:${bg}-100 disabled:cursor-not-allowed`
)

const SurveyAnswers = ({ answers, disabled }) => {
  return (
    <div className={styles.panel}>
      { answers?.map((answer, i) => (
        <button 
          className={getStyle(base[i])} 
          disabled={disabled}
          key={i} 
        > {answer} </button>)
      )}
    </div>
  )
}

export default SurveyAnswers;