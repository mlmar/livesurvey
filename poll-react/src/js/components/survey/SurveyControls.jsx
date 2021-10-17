import { useState } from 'react';
import { client } from '../../util/SocketUtil';
import Chart from './Chart';
import Question from '../create/question/Question';
import styles from '../../util/StyleUtil';

const SurveyControls = ({ questions, index, id, votes }) => {
  const [polling, setPolling] = useState(false);

  const handleStart = () => {
    setPolling(true);
    client.emit('SET_POLLING', { paused: false });
  }

  const handlePause = () => {
    setPolling(false);
    client.emit('SET_POLLING', { paused: true });
  }

  const handleDirection = (event) => {
    client.emit('SET_QUESTION', { type: event.currentTarget.id });
  }

  return (
    <div className={styles.fullPanel + "survey-controls"}>
      <div className="flex flex-col">
        <label className={styles.label + "text-5xl font-black"}> {id} </label>
        <label className={styles.label + "text-2xl font-black"}> Question {index + 1} of {questions?.length} </label> 
        { questions && <Question {...questions[index]}/> }
        <span className="flex justify-between">
          <button 
            className={styles.button.blue} 
            id="prev" 
            onClick={handleDirection} 
            disabled={!questions || index === 0}
            > &#10216; </button>
          { polling ? (
            <button className={styles.button.yellow} onClick={handlePause}> Pause </button>
            ) : (
              <button className={styles.button.green} onClick={handleStart}> Start </button>
              )
            }
          <button 
            className={styles.button.blue} 
            id="next" 
            onClick={handleDirection} 
            disabled={!questions || index === questions?.length - 1}
            > &#10217; </button>
        </span>
      </div>
      <Chart max={votes?.max} counts={votes?.counts?.[index]}/>
    </div>
  )
}

export default SurveyControls;