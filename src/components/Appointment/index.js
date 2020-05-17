import React from "react"
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status"
import Confirm from "./Confirm"

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, deleteInterview, onSave} = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE ="CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function onDelete() {
    transition(DELETE)
    deleteInterview(id)
    .then( () => transition(EMPTY))
    .catch(err => console.log("ERROR", err))
  }

  function save(userName,interviewer) {
    const interview = onSave(userName,interviewer);
    transition(SAVING);
    bookInterview(id, interview)
    .then(() =>transition(SHOW))

  }

  return  (
    <article className ="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty  onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewers[interview.interviewer].name}
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
          name={interview.student}
          interviewer={interview.interviewer}
          
        />
      }
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={onDelete}
        onCancel ={() => transition(SHOW)}
      />}

    </article>
  )
};