import React from "react";
import ReactDOM from "react-dom";

export default class Input extends React.Component{
  render() {
    return (
      <div>
        <form onSubmit={this.props.action}>
          {this.props.children}
          <button> {this.props.button}</button>
        </form>
      </div>
    );te
  }

}
