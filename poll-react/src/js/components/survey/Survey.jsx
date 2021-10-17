import { useState, useEffect } from 'react';
import SurveyAnswers from './SurveyAnswers';
import SurveyControls from './SurveyControls';
import socketUtil, { client } from '../../util/SocketUtil';

const Survey = ({ host, id }) => {
  const [survey, setSurvey] = useState({ questions: null, index: 0, id: <> &mdash; </> });
  const { questions, index } = survey;

  const [votes, setVotes] = useState(null);

  useEffect(() => {
    client.emit('START_INTERVAL');

    socketUtil.listen('SET_VOTES', setVotes);
    return () => {
      socketUtil.listen('SET_VOTES', null);
    }
  }, [])

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if(!host) client.emit('JOIN_SURVEY', { surveyID: id });
  }, [host, id])


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

  return <SurveyControls {...survey} votes={votes}/>
}

export default Survey;