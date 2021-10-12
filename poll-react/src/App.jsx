import { useReducer, useEffect } from 'react';
import './css/main.css'
import styles from './js/util/StyleUtil';
import useConnection from './js/hooks/useConnection.jsx';
import SocketWrapper from './js/components/socket/SocketWrapper.jsx'
import Create from './js/components/create/Create.jsx';
import Survey from './js/components/survey/Survey';
import socketUtil from './js/util/SocketUtil';

const reducer = (state, action) => {
  const { type, value } = action;
  switch(type) {
    case "setNavIndex": {
      return { ...state, navIndex: value }
    }
    case "setSurveyCode": {
      return { ...state, surveyCode: value }
    }
    case "joinSurvey": {
      return { ...state, surveyCode: value, navIndex: 1 }
    }
    case "setQuestion": {
      return { ...state, question: value}
    }
    default: return { ... state };
  }
}

const initialState = {
  navIndex: 0,
  surveyCode: "",
  question: null
}

/*
  App where users can create a poll with multiple questions on their comptuer 
  and users with a link can vote on answers from any device.
*/
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { navIndex, surveyCode, question } = state;

  const connectionStatus = useConnection();

  useEffect(() => {
    socketUtil.listen('SET_SURVEY_ID', ({ id }) => dispatch({ type: 'joinSurvey', value: id }));
  }, [])

  useEffect(() => {
    socketUtil.listen('SET_QUESTION', (q) => dispatch({ type: 'setQuestion', value: q }));
  }, [])


  const getOptions = () => {
    const handleClick = (event) => dispatch({ type: "setNavIndex", value: parseInt(event.currentTarget.id)});
    return (
      <div className={styles.panel + "items-center"}>
        <input 
          className={styles.textCenter + "w-60 mb-2"} 
          placeholder="Survey Code" 
          value={surveyCode}
          onChange={(event) => dispatch({ type: "setSurveyCode", value: event.currentTarget.value.toUpperCase() })}
        />
        <button className={styles.button.blue} id={1} onClick={handleClick} disabled={surveyCode.length === 0}> Join by Code </button>
        <label className={styles.label + "mt-5 mb-5"}> or </label>
        <button className={styles.button.green} id={2} onClick={handleClick} disabled={surveyCode.length > 0}> Create Survey </button>
      </div>
    )
  }
  
  const getContent = (index) => {
    if(!connectionStatus) return <label className={styles.textCenter}> No connection </label>
    if(connectionStatus === 1) return <label className={styles.textCenter}> Connecting </label>

    let content = null;
    switch(index) {
      case 1:
        content = <Survey question={question}/>
      case 2: 
        content = <Create/>
        break;
      default:
        content = getOptions();
        break;
    }

    return <SocketWrapper> {content} </SocketWrapper>
  }

  return (
    <div className="app items-center bg-gray-50 py-16">
      {getContent(navIndex)}
    </div>
  )
}

export default App
