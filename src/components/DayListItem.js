import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  let {name, spots, selected, setDay} = props
  let dayClass = classNames(
     "day-list__item",
      {
        "day-list__item--selected":selected,
        "day-list__item--full": spots ? false : true
      }
    ) 
    function formatSports () {
      if (spots > 1 ) {
        return `${spots} spots remaining`
      }  
      if (spots === 1) {
        return "1 spot remaining"
      } 
      else {
        return  "no spots remaining"
      }
    }
    spots = formatSports();
  return (
    <li className={dayClass} onClick={setDay} data-testid="day">
      <h2 className="text--regular ">{name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}