import { useReducer } from 'react';
import AnswerForm from './AnswerForm';
import useFocus from '../../../hooks/useFocus';
import styles from "../../../util/StyleUtil";

const initialState = { question: "", answers: [], tentativeAnswer: "" };
const questionFormReducer = (state, action) => {
  const { type, value } = action;
  switch(type) {
    case "setQuestion": {
      return { ...state, question: value };
    }
    case "addAnswer": {
      return { ...state, answers: [...state.answers, value], tentativeAnswer: "" };
    }
    case "removeAnswer": {
      return { ...state, answers: state.answers.filter((_, index) => index !== value) }
    }
    case "setTentativeAnswer": {
      return { ...state, tentativeAnswer: value }
    }
    case "resetForm": {
      return { ...initialState };
    }
    default: {
      return { ...state }
    }
  }
}


/*
  Form to create a question and set of answers to be added to the pol;
    - answers can be added and removed before submitting the final question and answers
    - @param {onSubmit} function is called with argument of question and array of answers when Add button is pressed
*/
const QuestionForm = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(questionFormReducer, initialState);
  const { question, answers, tentativeAnswer } = state;


  const handleSubmitQuestion = () => {
    if(onSubmit) onSubmit({ question, answers });
    dispatch({ type: "resetForm" });
  }
  const handleChangeQuestion = (event) => dispatch({ type: "setQuestion", value: event.currentTarget.value });

  const handleRemoveAnswer = (_, index) => dispatch({ type: "removeAnswer", value: index })

  const handleChangeTentativeAnswer = (value) => dispatch({ type: "setTentativeAnswer", value });
  const handleSubmitTentativeAnswer = (value) => dispatch({ type: "addAnswer", value });

  const questionRef = useFocus([question]); // focus question input when reset

  return (
    <div className="flex-col border border-solid border-gray-300 px-6 py-4">
      <input 
        className={styles.text + "mb-2"} 
        type="text" 
        placeholder="Question" 
        value={question} 
        onChange={handleChangeQuestion}
        tabIndex={1}
        autoFocus
        ref={questionRef}
      />

      { answers.length > 0 && answers.map((value, i) => (
        <AnswerForm
          type="remove"
          value={value}
          index={i}
          onSubmit={handleRemoveAnswer}
          disabled
          key={i + value}
        />
      ))}

      <AnswerForm
        type="add"
        value={tentativeAnswer}
        onChange={handleChangeTentativeAnswer}
        onSubmit={handleSubmitTentativeAnswer}
        tabIndex={2}
      />
      <span className="flex justify-end">
        <button 
          className={styles.button.blue} 
          onClick={handleSubmitQuestion} 
          tabIndex={3} 
          disabled={answers.length === 0}
        > Add Question </button>
      </span>
    </div>
  )
}

export default QuestionForm;