import React from "react";

import { render, cleanup, queryByText, queryByAltText, getByPlaceholderText,waitForElement, getAllByTestId, fireEvent,getByText, debug, prettyDOM, getByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";


afterEach(cleanup);
describe("Application",()=> {
  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText, debug} = render(<Application />);

  //   await waitForElement(() => getByText("Monday"));

  //   fireEvent.click(getByText("Tuesday"));

  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });

  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   const {container, debug} = render(<Application />);
  //   await waitForElement(() =>getByText(container, "Archie Cohen"))

  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0]
  //   //click add new appontment button
  //   getByAltText(appointment, "Add").click();
  //   expect(getByPlaceholderText(appointment,"Enter Student Name")).toHaveValue("");
  //   //fill out form and click save
  //   fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });
  //   expect(getByPlaceholderText(appointment,"Enter Student Name")).toHaveValue("Lydia Miller-Jones");
  //   //choose interviewer 
  //   getByAltText(appointment, "Sylvia Palmer").click();
  //   expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  //   // console.log(prettyDOM(appointment));
  //   getByText(appointment, "Save").click();
  //   expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  //   await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );
    
  //   expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  // });

  // it("loads data, books an interview and increases the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //   const { container } = render(<Application />);
  
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[1];
    
  //   getByAltText(appointment,"Delete").click()
  //   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  //   getByText(appointment, "Confirm").click()

  //   expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  //   await waitForElement(() => queryByAltText(appointment,"Add"));

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  //   // 3. Click the "Add" button on the first empty appointment.
  //   // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   // 5. Click the first interviewer in the list.
  //   // 6. Click the "Save" button on that same appointment.
  //   // 7. Check that the element with the text "Saving" is displayed.
  //   // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  //   // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  // });

  // it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //   const { container } = render(<Application />);
  
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[1];
  //   getByAltText(appointment,"Edit").click()
  //   fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
  //     target: { value: "Amro" }
  //   });
  //   expect(getByPlaceholderText(appointment,"Enter Student Name")).toHaveValue("Amro");
  //   getByAltText(appointment, "Sylvia Palmer").click();
  //   expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  //   getByText(appointment, "Save").click()

  //   expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  //   // console.log(prettyDOM(appointment))

  //   await waitForElement(() => queryByText(appointment, "Amro"));


  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  // });

  // it("shows the save error when failing to save an appointment", async () => {
  //   axios.put.mockRejectedValueOnce();
  //   const {container, debug} = render(<Application />);
  //   await waitForElement(() =>getByText(container, "Archie Cohen"))

  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0]
  //   //click add new appontment button
  //   getByAltText(appointment, "Add").click();
  //   expect(getByPlaceholderText(appointment,"Enter Student Name")).toHaveValue("");
  //   //fill out form and click save
  //   fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });
  //   expect(getByPlaceholderText(appointment,"Enter Student Name")).toHaveValue("Lydia Miller-Jones");
  //   //choose interviewer 
  //   getByAltText(appointment, "Sylvia Palmer").click();
  //   expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  //   // console.log(prettyDOM(appointment));
  //   getByText(appointment, "Save").click();
  //   expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  //   await waitForElement(() => queryByText(appointment, "Could not save appointment!"));

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );
    
  //   expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  // });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

     // 1. Render the Application.
     const { container } = render(<Application />);
  
     // 2. Wait until the text "Archie Cohen" is displayed.
     await waitForElement(() => getByText(container, "Archie Cohen"));
     const appointments = getAllByTestId(container, "appointment");
     const appointment = appointments[1];
     
     getByAltText(appointment,"Delete").click()
     expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
     getByText(appointment, "Confirm").click()
 
     expect(getByText(appointment, "Deleting")).toBeInTheDocument();
     console.log(prettyDOM(appointment))
     await waitForElement(() => queryByAltText(appointment,"Could not delete appointment!"));
  })
});