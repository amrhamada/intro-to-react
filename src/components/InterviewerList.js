import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props;   

  let ints = [];
  
  for (const key in interviewers) {
    ints.push(interviewers[key])
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {ints.map((item) =>{ 
      return <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar} 
        selected={value && item.id === value}
        onChange={() => onChange(item.id)}  />
    })}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}