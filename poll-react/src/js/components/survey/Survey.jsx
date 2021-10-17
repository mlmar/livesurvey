import { useState, useEffect } from "react";
import SurveyAnswers from "./SurveyAnswers";
import SurveyControls from "./SurveyControls";
import socketUtil from '../../util/SocketUtil';

const Survey = ({ host }) => {
  const [survey, setSurvey] = useState({ questions: null, index: 0 });
  const [disabled, setDisabled] = useState(false);

  const { questions, index } = survey;

  // add listeners
  useEffect(() => {
    socketUtil.listen('SET_SURVEY', setSurvey);
    socketUtil.listen('SET_DISABLED', setDisabled);

    return () => { // remove listeners
      socketUtil.listen('SET_SURVEY', null);
      socketUtil.listen('SET_DISABLED', null);
    }
  }, []);

  if(!host) {
    return <SurveyAnswers {...questions?.[index]} disabled={disabled}/>
  }

  return <SurveyControls {...survey}/>
}

export default Survey;