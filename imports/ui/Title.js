import React from "react";
import ReactDOM from "react-dom";

export default class Title extends React.Component{
  render() {
    return (
      <div className="title-bar">
        <h1>{this.props.children}</h1>
      </div>
    );
  }

}
