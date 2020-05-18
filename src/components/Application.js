import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    save
  } = useApplicationData();
  const appointments = getAppointmentsForDay(state,state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu" >
        <DayList
          day={state.day} 
          setDay={setDay}
          days={state.days}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
    />

      </section>
      <section className="schedule">
        {appointments.map((apt) =>{
          return (
            <Appointment 
              key={apt.id}
              {...apt}
              interview={getInterview(state, apt.interview)}
              interviewers ={interviewers}
              bookInterview={bookInterview}
              cancelInterview = {cancelInterview}
              onSave={save}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
