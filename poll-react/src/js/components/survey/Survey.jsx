import styles from '../../util/StyleUtil';
import colors from '../../util/ColorUtil';

const Survey = ({ question, disabled }) => {
  return (
    <div className={styles.panel}>
      { question?.answers?.map((q, i) => <button className={styles.button.plain + styles.hover.plain + colors[i] + styles.disabled.plain} key={i} disabled></button>)}
    </div>
  )
}

export default Survey;