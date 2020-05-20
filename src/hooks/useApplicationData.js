
import React, {useState, useEffect} from "react"
import axios from "axios"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(res => setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data })))
    .catch(err => console.log(err));
  }, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
            return {
              ...day,
              spots: day.spots+1
            }
          }
          return day
    })
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      setState(prev => ({...prev, appointments, days}))
          })
  }

   function bookInterview(id, interview, edit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    let days 
    if (!edit) {
      days= state.days.map(day => {
        if (day.appointments.includes(id)) {
              return {
                ...day,
                spots: day.spots-1
              }
            }
            return day
      }) 
    } else days= state.days
    return axios.put(`/api/appointments/${id}`,{
      
      interview:{...appointment.interview}
    })
    .then( () => {   
      const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev, appointments, days})); 
    })
  }

   function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

   const setDay = day => setState({...state, day});
 
  return {state, setDay, bookInterview, cancelInterview, save}
}