import React, { Component } from "react";
import PropTypes from "prop-types";

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
    const { title, placeholder } = this.props;
    return (
      <header className="header">
        <h1>{title}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder={placeholder}
            autoFocus
            onInput={this.onInputChange}
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  placeholder: "What needs to be done?",
  title: "todos",
};

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
