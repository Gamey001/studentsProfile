import React from "react";
import ReactDom from "react-dom";
import Students from "./Students";
import NavBar from "./NavBar";
import Search from "./Search";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      /*studentsClone data copy is a constant all search operations are carried out
             on this copy since it always holds the complete list of students */
      studentsClone: [],
      students: [], //the data displayed on view comes from this copy, it holds search result
      searchInputs: [
        { inputField: "name", value: "" },
        { inputField: "tag", value: "" },
      ],
    };
  }

  search = (pattern, inputField) => {
    let nameInput;
    let tagInput;
    if (pattern) {
      if (inputField === "name") {
        //code to run when name field is on focus and not empty
        nameInput = pattern.toLowerCase();
        //update the value of the name input and get the current tag field value from the global state
        this.setState({
          searchInputs: [
            ...this.state.searchInputs.map((input) => {
              if (input.inputField === inputField) {
                input.value = pattern.toLowerCase();
              }
              if (input.inputField === "tag") {
                tagInput = input.value;
              }
              return input;
            }),
          ],
        });
        if (tagInput) {
          //filter for tag, and then name if both inputs are not empty
          let results = [
            ...this.state.studentsClone.filter((student) => {
              let pass = false;
              student.tags.map((tag) => {
                if (tag.toLowerCase().includes(tagInput)) {
                  pass = true;
                }
                return tag;
              });
              return pass;
            }),
          ];

          let results2 = [
            ...results.filter(
              (student) =>
                student.firstName.toLowerCase().includes(nameInput) ||
                student.lastName.toLowerCase().includes(nameInput) ||
                (
                  student.firstName.toLowerCase() +
                  " " +
                  student.lastName.toLowerCase()
                )
                  .toLowerCase()
                  .includes(nameInput)
            ),
          ];
          this.setState({ students: results2 });
        } else {
          //filter for only name if name not empty, but tag field is
          if (nameInput) {
            this.setState({
              students: [
                ...this.state.studentsClone.filter(
                  (student) =>
                    student.firstName.toLowerCase().includes(nameInput) ||
                    student.lastName.toLowerCase().includes(nameInput) ||
                    (
                      student.firstName.toLowerCase() +
                      " " +
                      student.lastName.toLowerCase()
                    )
                      .toLowerCase()
                      .includes(nameInput)
                ),
              ],
            });
          } else {
            //code to run when name is on focus and both fields are empty
            this.setState({ students: this.state.studentsClone });
          }
        }
      } else {
        //code to run when tag field is on focus and and not empty
        tagInput = pattern.toLowerCase();
        this.setState({
          searchInputs: [
            ...this.state.searchInputs.map((input) => {
              if (input.inputField === inputField) {
                input.value = pattern.toLowerCase();
              }
              if (input.inputField === "name") {
                nameInput = input.value;
              }
              return input;
            }),
          ],
        });
        //checks wether it is a combine search that is required or if name input has been entered
        if (nameInput) {
          let results = [
            ...this.state.studentsClone.filter((student) => {
              let pass = false;
              student.tags.map((tag) => {
                if (tag.toLowerCase().includes(tagInput)) {
                  pass = true;
                }
                return tag;
              });
              return pass;
            }),
          ];

          let results2 = [
            ...results.filter(
              (student) =>
                student.firstName.toLowerCase().includes(nameInput) ||
                student.lastName.toLowerCase().includes(nameInput) ||
                (
                  student.firstName.toLowerCase() +
                  " " +
                  student.lastName.toLowerCase()
                )
                  .toLowerCase()
                  .includes(nameInput)
            ),
          ];
          this.setState({ students: results2 });
        } else {
          if (tagInput) {
            this.setState({
              students: [
                ...this.state.studentsClone.filter((student) => {
                  let pass = false;
                  student.tags.map((tag) => {
                    if (tag.toLowerCase().includes(tagInput)) {
                      pass = true;
                    }
                    return tag;
                  });
                  return pass;
                }),
              ],
            });
          } else {
            this.setState({ students: this.state.studentsClone });
          }
        }
      }
      //end of if non-empty string onchange
    } else {
      if (inputField === "name") {
        nameInput = pattern;
        this.setState({
          searchInputs: [
            ...this.state.searchInputs.map((input) => {
              //update the value of the name input in the global state
              if (input.inputField === inputField) {
                input.value = pattern;
              }
              /*get the current value of the tag input from the global state so 
                    you know wether a combine search that is required*/
              if (input.inputField === "tag") {
                tagInput = input.value;
              }
              return input;
            }),
          ],
        });
        //console.log(this.state.searchInputs[0].value)
        if (tagInput) {
          //combine search if tag input is not empty
          let results = [
            ...this.state.studentsClone.filter((student) => {
              let pass = false;
              student.tags.map((tag) => {
                if (tag.toLowerCase().includes(tagInput)) {
                  pass = true;
                }
                return tag;
              });
              return pass;
            }),
          ];
          this.setState({ students: results });
        } else {
          //if both fields are empty
          this.setState({ students: this.state.studentsClone });
        }
      } else {
        tagInput = pattern;
        this.setState({
          searchInputs: [
            ...this.state.searchInputs.map((input) => {
              //update the tag input in the parent state
              if (input.inputField === inputField) {
                input.value = pattern;
              }
              //get the value of the name field from the parent state
              if (input.inputField === "name") {
                nameInput = input.value;
              }
              return input;
            }),
          ],
        });
        //checks wether it is a combine search that is required or if name input has been entered
        if (nameInput) {
          let results = [
            ...this.state.studentsClone.filter(
              (student) =>
                student.firstName.toLowerCase().includes(nameInput) ||
                student.lastName.toLowerCase().includes(nameInput) ||
                (
                  student.firstName.toLowerCase() +
                  " " +
                  student.lastName.toLowerCase()
                )
                  .toLowerCase()
                  .includes(nameInput)
            ),
          ];
          this.setState({ students: results });
        } else {
          this.setState({ students: this.state.studentsClone });
        }
      }
    }
  };

  addNewTag = (newTag, studentId) => {
    this.setState({
      students: this.state.students.map((student) => {
        if (student.id === studentId) {
          student.tags.push(newTag);
        }
        return student;
      }),
    });
  };
  getStudentAverage = (grades) => {
    let total = 0,
      x,
      average;
    for (x of grades) {
      total += Number(x);
    }
    average = total / 8;
    average = average + "%";
    return average;
  };

  componentDidMount() {
    //fetches data from the id after the app has rendered and updates the root state to display the data
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          students: data.students.map((student) => {
            student.tags = [];
            return student;
          }),
        });
        this.setState({
          studentsClone: data.students.map((student) => {
            student.tags = [];
            student.averageScore = this.getStudentAverage(student.grades);
            return student;
          }),
        });
      });
  }

  render() {
    const appContainerStyle = {
      maxWidth: "45em",
      margin: "auto",
      background: "rgb(241, 240, 240)",
      padding: "2.5em",
    };
    const appInnerContainerStyle = {
      background: "#ffffff",
      padding: "1em",
      borderRadius: ".8em",
      minHeight: "100vh",
    };
    let skey = 0;
    return (
      <div>
        <div style={appContainerStyle}>
          <div style={appInnerContainerStyle}>
            <NavBar students={this.state.students} />
            {this.state.searchInputs.map(input =><Search key={++skey} inputField={input.inputField} search={this.search} />)}

            <Students
              addNewTag={this.addNewTag}
              students={this.state.students}
            />
          </div>
        </div>
      </div>
    );
  }
}
