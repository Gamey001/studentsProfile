import React from "react";
import ReactDom from "react-dom";

export default class Student extends React.Component {
  state = {
    gradesVisibility: false,
    tags: [],
    newTag: "",
  };

  viewGradesToggler = () => {
    this.setState({ gradesVisibility: !this.state.gradesVisibility });
  };

  addTagOnchange = (e) => {
    this.setState({ newTag: e.target.value });
  };

  addTagOnSubmit = (e) => {
    const { id } = this.props.details;
    e.preventDefault();
    let newTag = this.state.newTag;
    //send the newTag to the parent component state to be added to the student's tag array
    this.props.addNewTag(newTag, id);
    this.setState({ newTag: "" });
    const inputId = id;
    document.getElementById(inputId).value = "";
  };

  render() {
    const addTagStyle = {
      border: "none",
      outline: "none",
      borderBottom: "2px solid grey",
      marginBottom: "1em",
    };
    const detailListStyle = { paddingLeft: "0", listStyleType: "none" };
    const profileImgStyle = {
      border: ".05em solid grey",
      transform: "scale(1.5)",
    };
    const tagStyle = {
      background: "rgb(237, 235, 235)",
      fontSize: "1em",
      fontWeight: "200",
    };

    const gradesListToggleBtn = {
      position: "absolute",
      right: "1.4em",
      top: "0",
      display: "inline-block",
      textAlign: "center",
      transform: "scale(.5)",
      width: "2em",
      height: "2em",
    };

    const {
      id,
      firstName,
      lastName,
      email,
      company,
      skill,
      grades,
      pic,
      tags,
      averageScore,
    } = this.props.details;
    let gradesKey=0;
    let tagsKey=0;
    return (
      <React.Fragment>
        <div className="container-fluid mt-2 student-profile">
          <div className="row" style={{ position: "relative" }}>
            <div className="col-3 text-center">
              <img
                style={profileImgStyle}
                className="rounded-circle mt-4"
                src={pic}
                alt={"student " + id + " photo"}
              />
            </div>
            <div className="col-9">
              <h3>
                {firstName} {lastName}
              </h3>
              <ul id="personalInfoList" style={detailListStyle}>
                <li style={{ lineHeight: "1.3em" }}>
                  <span>Email:</span> {email}
                </li>
                <li style={{ lineHeight: "1.3em" }}>
                  <span>Company:</span> {company}
                </li>
                <li style={{ lineHeight: "1.3em" }}>
                  <span>Skill:</span> {skill}
                </li>
                <li style={{ lineHeight: "1.3em" }}>
                  <span>Average:</span> {averageScore}
                </li>
              </ul>
              <ul style={detailListStyle}>
                {tags.map((tag) => 
                      (
                      <li key={++tagsKey} className="mb-2">
                        <span style={tagStyle} className="badge p-2">
                          {tag}
                        </span>
                      </li>
                    )
                )}
              </ul>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {this.state.gradesVisibility === true ? (
                      <a
                        onClick={this.viewGradesToggler}
                        style={gradesListToggleBtn}
                        data-toggle="collapse"
                        href={"#collapse" + id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </a>
                    ) : (
                      <a
                        onClick={this.viewGradesToggler}
                        style={gradesListToggleBtn}
                        data-toggle="collapse"
                        href={"#collapse" + id}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div id={"collapse" + id} className="panel-collapse collapse">
                    <ul className="list-group gradesList">
                      {grades.map((grade) => 
                            (
                            <li key={++gradesKey} className="list-group-item">
                              Test
                              {grades.indexOf(grade) + 1}: {"   "}
                              {grade}
                              {"%"}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <form action="#" onSubmit={this.addTagOnSubmit}>
                <input
                  id={id}
                  style={addTagStyle}
                  type="text"
                  onChange={this.addTagOnchange}
                  placeholder="Add a tag"
                />
              </form>
            </div>
          </div>
        </div>
        <div style={{ border: ".5px solid 	rgb(241, 240, 240)" }}></div>
      </React.Fragment>
    );
  }
}
