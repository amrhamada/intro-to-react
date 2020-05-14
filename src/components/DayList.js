import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props) {
   const {days, day, setDay} = props;
  return <ul>{days.map((item) =>
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots} 
      selected={item.name === day}
      setDay={() => setDay(item.name)}  />
  )}</ul>;
}
