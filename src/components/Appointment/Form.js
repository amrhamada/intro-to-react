import React, {useState} from "react";
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form(props) {
  // const {name, interviewers, interviewer, onSave, onCancel} = props
  let [userName, setUserName] = useState( props.name || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setInterviewer(null);
    setUserName("");
  }
  function cancel() {
    props.onCancel();
    reset();
  }
  function save() {
    props.onSave(userName, interviewer);
    return {userName, interviewer}
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            Value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save}confirm>Save</Button>
        </section>
      </section>
    </main>
  
  );
}