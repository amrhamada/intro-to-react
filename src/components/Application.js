import React, {useState, useEffect} from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import axios from "axios"
import {getAppointmentsForDay, getInterview} from "helpers/selectors"


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//   },
//   {
//     id: 4,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })

  const setDay = day => setState({...state, day});
 console.log("interviewers", state.interviewers)
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
  console.log("appointments",appointments)
  const schedule = appointments.map((appointment) => getInterview(state, appointment.interview));
  
  console.log("Schedule", schedule)
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
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
