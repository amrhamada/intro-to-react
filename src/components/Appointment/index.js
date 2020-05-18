import React from "react"
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status"
import Confirm from "./Confirm"
import Error from "./Error"

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview, onSave} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE ="CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM";
  const ERROR_SAVING = "ERROR_SAVING"
  const ERROR_DELETING = "ERROR_DELETING"
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  function onDelete() {
    transition(DELETE, true)
    cancelInterview(id)
    .then( () => transition(EMPTY))
    .catch(() => transition(ERROR_DELETING, true))
  }

  function save(userName,interviewer) {
    const interview = onSave(userName,interviewer);
    transition(SAVING);
    bookInterview(id, interview)
    .then(() =>transition(SHOW))
    .catch(() => transition(ERROR_SAVING, true))

  }

  return  (
    <article className ="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty  onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={ () => transition(CREATE)}
        />
      )}
      {mode === CREATE && 
        <Form
          onCancel={back}
          id={id}
          interviewers ={interviewers}
          onSave={save}
          name={interview && interview.student}
          interviewer={interview && interview.interviewer}
          
        />
      }
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={onDelete}
        onCancel ={() => transition(SHOW)}
      />}
      {mode === ERROR_DELETING && <Error 
        message="Could not delete appointment!" onClose={() => back()}
      />}
      {mode === ERROR_SAVING && <Error 
        message="Could not save appointment!" onClose={() => back()}
      />}
    </article>
  )
};