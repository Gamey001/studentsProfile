import React from "react";
import ReactDom from "react-dom";
import Student from "./Student";

export default class Students extends React.Component {
  render() {
    const { students, addNewTag } = this.props;
    return (
      <div>
        {students.map((student) => (
          <Student key={student.id} addNewTag={addNewTag} details={student} />
        ))}
      </div>
    );
  }
}
