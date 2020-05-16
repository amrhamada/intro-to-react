export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  let aptmnts;
  for (const el of state.days) {
    if (el.name === day ) {
      aptmnts =  el.appointments;
      break;
    }
  }
  if (aptmnts) {
    let results=[];
    for (const key in state.appointments) {
      if (aptmnts.includes(state.appointments[key].id)) results.push(state.appointments[key]) 
    }
    return results;
  }
  return [];
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];
  let interviewers;
  for (const el of state.days) {
    if (el.name === day ) {
      interviewers =  el.interviewers;
      break;
    }
  }
  if (interviewers) {
    let results=[];
    for (const key in state.interviewers) {
      if (interviewers.includes(state.interviewers[key].id)) results.push(state.interviewers[key]) 
    }
    return results;
  }
  return [];
}

export  function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewersId = interview.interviewer;
  return {
    student: interview.student,
    interviewer: {
      id:interviewersId,
      name: state.interviewers[interviewersId].name,
      avatar: state.interviewers[interviewersId].avatar
    }

  }
}

