import styles from '../../util/StyleUtil';
import { base } from '../../util/ColorUtil';
import { client } from '../../util/SocketUtil';

const getStyle = (bg) => (
  `${bg}-200 appearance-none text-gray-700 font-bold rounded px-4 py-1 focus:outline-none h-12 mb-2 ` + 
  `hover:${bg}-300 ` + 
  `disabled:${bg}-100 disabled:hover:${bg}-100 disabled:cursor-not-allowed`
)

const SurveyAnswers = ({ answers, disabled }) => {
  const handleClick = (event) => {
    const { id } = event.currentTarget;
    client.emit('SET_VOTE', { answerIndex: id })
  }

  return (
    <div className={styles.panel}>
      { answers?.map((answer, i) => (
        <button 
          className={getStyle(base[i])} 
          disabled={disabled}
          onClick={handleClick}
          id={i}
          key={i} 
        > {answer} </button>)
      )}
    </div>
  )
}

export default SurveyAnswers;