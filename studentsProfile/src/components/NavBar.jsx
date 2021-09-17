import React from "react";
import ReactDom from "react-dom";

export default class NameSearch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav
          style={{ background: "rgb(0,47,89)", padding: "2em" }}
          className=" sticky-top "
        >
          <div>
            <div>
              <h1
                style={{
                  color: "rgb(79, 230, 230)",
                  textAlign: "center",
                  fontSize: "1.6em",
                }}
              >
                STUDENT PROFILES
              </h1>
            </div>
            <div style={{ color: "white", paddingLeft: "4.5em" }}>
              {"results: "}
              <span
                style={{ fontSize: "1.2em" }}
                className="badge badge-warning"
              >
                {this.props.students.length}
              </span>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
