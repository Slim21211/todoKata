import React, { Component } from "react";

export class NewTaskForm extends Component {
  state = {
    label: "",
  };
  onInputChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onInput={this.onInputChange}
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}
