import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
  };
  onInputChange = (event) => {
    this.setState({
      label: event.target.value.trimStart(),
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: '',
    });
  };
  render() {
    return (
      <header>
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            required
            onInput={this.onInputChange}
            value={this.state.label}
          ></input>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
