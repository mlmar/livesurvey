import { useState } from 'react';
import QuestionForm from './question/QuestionForm';
import Question from './question/Question';
import styles from '../../util/StyleUtil';
import { client } from '../../util/SocketUtil';

/*
  Create
    - Get room name
    - Get set of questions and answers
    - Submit to server and wait for a response for a room code
*/
const Create = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitQuestion = (question) => {
    setQuestions(prev => [...prev, question]);
  }

  const handleRemoveQuestion = (event) => {
    setQuestions(prev => prev.filter((_, index) => index !== parseInt(event.target.id)));
  }

  const handleCreate = () => {
    setLoading(true);
    client.emit('CREATE_SURVEY', { title, questions });
  }

  return (
    <div className={styles.panel}>
      <div className="mb-12">
        <label className={styles.label}> What's the title of this Live Survey? </label>
        <input className={styles.text} type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
      </div>

      <div className="mb-4">
        <label className={styles.label}> What questions will you ask? </label>
        { questions.map((question, i) => (
          <Question {...question} key={i}> 
            <span className="flex justify-end">
              <button 
                className={styles.button.red} 
                onClick={handleRemoveQuestion} 
                id={i}
              > Remove </button>
            </span>
          </Question>
        ))}
        <QuestionForm onSubmit={handleSubmitQuestion}/>
      </div>
      <span className="flex justify-end">
        <button className={styles.button.green} disabled={questions.length === 0 || title.length === 0 || loading} onClick={handleCreate}> 
          { loading ? "Loading..." : "Create Live Survey" }
        </button>
      </span>
    </div>
  )
}

export default Create;