import React, {useState} from "react";
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form(props) {
  // const {name, interviewers, interviewer, onSave, onCancel} = props
  let [userName, setUserName] = useState( props.name || "");
  let [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");
  function reset() {
    setInterviewer(null);
    setUserName("");
  }
  function onCancel() {
    props.onCancel();
    reset();
  }
  function onSave() {
    if (userName === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(userName,interviewer);
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
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer && interviewer} 
          onChange={(id) => setInterviewer(id)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>Cancel</Button>
          <Button onClick={onSave}confirm>Save</Button>
        </section>
      </section>
    </main>
  
  );
}