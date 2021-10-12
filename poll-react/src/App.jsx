import { useReducer } from 'react';
import './css/main.css'
import styles from './js/util/StyleUtil';
import Create from './js/components/create/Create.jsx';


const reducer = (state, action) => {
  const { type, value } = action;
  switch(type) {
    case "setNavIndex": {
      return { ...state, navIndex: value }
    }
    case "setLoading": {
      return { ...state, loading: value }
    }
    case "setSurveyCode": {
      return { ...state, surveyCode: value }
    }
    default: return { ... state };
  }
}

const initialState = {
  navIndex: 0,
  loading: false,
  surveyCode: ""
}

/*
  App where users can create a poll with multiple questions on their comptuer 
  and users with a link can vote on answers from any device.
*/
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { navIndex, loading, surveyCode } = state;

  const getOptions = () => {
    const handleClick = (event) => dispatch({ type: "setNavIndex", value: parseInt(event.currentTarget.id)});
    return (
      <div className={styles.panel + "items-center"}>
        <input 
          className={styles.textCenter + "text-center w-60 mb-2"} 
          placeholder="Survey Code" 
          value={surveyCode}
          onChange={(event) => dispatch({ type: "setSurveyCode", value: event.currentTarget.value })}
        />
        <button className={styles.button.blue} id={1} onClick={handleClick} disabled={surveyCode.length === 0}> Join by Code </button>
        <label className={styles.label + "mt-5 mb-5"}> or </label>
        <button className={styles.button.green} id={2} onClick={handleClick} disabled={surveyCode.length > 0}> Create Survey </button>
      </div>
    )
  }
  
  const getContent = (index) => {
    switch(index) {
      case 2: return <Create/>
      default: return getOptions();
    }
  }
  
  return (
    <div className="app items-center bg-gray-50 py-16">
      {getContent(navIndex)}
    </div>
  )
}

export default App
