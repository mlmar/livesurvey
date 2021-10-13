import { useState, useEffect } from "react";
import SurveyAnswers from "./SurveyAnswers";

import socketUtil from '../../util/SocketUtil';

const Survey = ({ host }) => {
  const [question, setQuestion] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // add listeners
  useEffect(() => {
    socketUtil.listen('SET_QUESTION', setQuestion);
    socketUtil.listen('SET_DISABLED', setDisabled);

    return () => { // remove listeners
      socketUtil.listen('SET_QUESTION', null);
      socketUtil.listen('SET_DISABLED', null);
    }
  }, []);

  if(!host) {
    return <SurveyAnswers disabled={disabled}/>
  }

  return <label> HLELO </label>
}

export default Survey;