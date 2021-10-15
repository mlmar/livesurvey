import { useState, useEffect } from 'react';
import { client } from '../../util/SocketUtil';
import Question from '../create/question/Question';
import styles from '../../util/StyleUtil';

const SurveyControls = ({ questions, index }) => {
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    client.emit('START_INTERVAL');
  }, [])

  const handleStart = () => {
    setPolling(true);
    client.emit('SET_POLLING', { paused: false });
  }

  const handlePause = () => {
    setPolling(false);
    client.emit('SET_POLLING', { paused: true });
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])


  return (
    <div className={styles.panel}>
      { questions && <Question {...questions[index]}/> }
      <Controls polling={polling} onStart={handleStart} onPause={handlePause}/>
    </div>
  )
}

const Controls = ({ polling, onStart, onPause}) => {
  return (
    <span className="flex justify-between">
      <button className={styles.button.blue}> &#10216; </button>
      { polling ? (
          <button className={styles.button.yellow} onClick={onPause}> Pause </button>
        ) : (
          <button className={styles.button.green} onClick={onStart}> Start </button>
        )
      }
      <button className={styles.button.blue}> &#10217; </button>
    </span>
  )
}

export default SurveyControls;