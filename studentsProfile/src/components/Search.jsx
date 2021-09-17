import React from "react";
import ReactDom from "react-dom";

export default class Search extends React.Component {
  onChangeHandler = (e) => {
    let pattern = e.target.value;
    let inputField = this.props.inputField;
    this.props.search(pattern, inputField);
  };
  render() {
    const style = {
      width: "100%",
      border: "none",
      outline: "none",
      borderBottom: "2px solid grey",
      marginBottom: "1.3em",
    };
    return (
      <React.Fragment>
        <form action="#" className="text-center mt-2">
          <input
            style={style}
            id="tagSearchInput"
            name="tagPattern"
            placeholder={
              this.props.inputField === "name"
                ? "Search By Name..."
                : "Search By Tag..."
            }
            type="text"
            onChange={this.onChangeHandler}
          />
        </form>
      </React.Fragment>
    );
  }
}
