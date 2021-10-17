import { useReducer, useEffect } from 'react';
import './css/main.css'
import styles from './js/util/StyleUtil';
import useConnection from './js/hooks/useConnection.jsx';
import SocketWrapper from './js/components/socket/SocketWrapper.jsx'
import Create from './js/components/create/Create.jsx';
import Survey from './js/components/survey/Survey';
import socketUtil, { client } from './js/util/SocketUtil';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case "setNavIndex": {
      return { ...state, navIndex: payload.navIndex };
    }
    case "setSurveyID": {
      return { ...state, surveyID: payload.surveyID };
    }
    case "joinSurvey": {
      return { ...state, navIndex: 1 };
    }
    case "setHost": {
      return { ...state, host: true };
    }
    case "createSurvey": {
      return { ...state, host: true, surveyID: payload.surveyID, navIndex: 1 }
    }
    case "reset": {
      return { ...initialState };
    }
    default: return { ... state };
  }
}

const initialState = {
  navIndex: 0,
  surveyID: "",
  host: false
}

/*
  App where users can create a poll with multiple questions on their comptuer 
  and users with a link can vote on answers from any device.
*/
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { navIndex, surveyID, host } = state;

  const connectionStatus = useConnection();

  useEffect(() => {
    socketUtil.listen('CREATE_SURVEY', (id) => dispatch({ type: "createSurvey", payload: { id } }))
  }, [])

  const getOptions = () => {
    return (
      <div className={styles.panel + "items-center"}>
        <input 
          className={styles.textCenter + "w-60 mb-2"} 
          placeholder="Survey Code" 
          value={surveyID}
          onChange={(event) => dispatch({ type: "setSurveyID", payload: { surveyID: event.currentTarget.value.toUpperCase() }})}
        />
        <button 
          className={styles.button.blue} 
          onClick={() => dispatch({ type: "joinSurvey" })} 
          disabled={surveyID.length === 0}
        > Join by Code </button>
        <label className={styles.label + "mt-5 mb-5"}> or </label>
        <button 
          className={styles.button.green}
          onClick={() => dispatch({ type: "setNavIndex", payload: { navIndex: 2 }})} 
          disabled={surveyID.length > 0}
        > Create Survey </button>
      </div>
    )
  }

  const getContent = () => {
    switch(navIndex) {
      case 1:
        return <Survey host={host} id={surveyID}/>
      case 2: 
        return <Create/>
      default:
        return getOptions();
    }
  }

  const getConnectionLabels = () => {
    if(!connectionStatus) return <label className={styles.textCenter}> No connection </label>
    if(connectionStatus === 1) return <label className={styles.textCenter}> Connecting </label>
  }
  

  return (
    <div className="app items-center bg-gray-50 p-5">
      { connectionStatus == 2 ? (
          <SocketWrapper>
            {getContent()}
          </SocketWrapper>
        ) : (
          getConnectionLabels()
        )
      }
    </div>
  )
}

export default App
