import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, onChange} = props;
  let interViewerClass = classNames(
    "interviewers__item",
      {
        "interviewers__item--selected":selected,
        // "interviewers__item-image":selected

      }
  );

  let imageClass = classNames(
    "interviewers__item-image"
  );

  return (
    <li className={interViewerClass} onClick={onChange}>
      <img 
        className={imageClass}
        src={avatar}
        alt={name} 
      />
      {selected && name}
    </li>
   );
}