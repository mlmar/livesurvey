import QuestionForm from "./question/QuestionForm";
import styles from "../../util/StyleUtil";

/*
  Create
    - Get room name
    - Get set of questions and answers
    - Submit to server and wait for a response for a room code
*/
const Create = () => {
  const handleSubmit = (event) => {
    
  }

  return (
    <div className="flex-col shadow-md p-8 py-10 bg-white rounded-md lg:w-1/2 md:w-9/12 w-11/12">
      <div className="mb-12">
        <label className={styles.label}> What's the title of this live survey? </label>
        <input className={styles.text} type="text" placeholder="Title"/>
      </div>
      <div className="mb-4">
        <label className={styles.label}> What questions will you ask? </label>
        <QuestionForm onSubmit={handleSubmit}/>
      </div>
    </div>
  )
}

export default Create;