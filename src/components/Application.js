import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import axios from "axios"
import {getAppointmentsForDay, getInterview} from "helpers/selectors"



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  function save(name, interviewer) {
    console.log(name, interviewer)
    const interview = {
      student: name,
      interviewer
    };
  }
  

  const setDay = day => setState({...state, day});
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(res => setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data })))
    .catch(err => console.log(err));
  }, []);

  const appointments = getAppointmentsForDay(state,state.day);
  const schedule = appointments.map((appointment) => getInterview(state, appointment.interview));
  
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
              interviewers ={state.interviewers}
              bookInterview={bookInterview}
              onSave={save}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
