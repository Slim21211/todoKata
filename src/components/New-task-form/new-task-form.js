import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onInputChange = (event) => {
    this.setState({
      label: event.target.value.trimStart(),
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdded(this.state.label, this.state.minutes, this.state.seconds);
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  onChangeMinute = (event) => {
    if (event.target.value >= 0) {
      this.setState({
        minutes: Number(event.target.value),
      });
    }
  };

  onChangeSecond = (event) => {
    if (event.target.value >= 0 && event.target.value < 60) {
      this.setState({
        seconds: Number(event.target.value),
      });
    }
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
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onChangeMinute}
            value={this.state.minutes}
            required
          ></input>
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onChangeSecond}
            value={this.state.seconds}
            min={0}
            max={60}
            required
          ></input>
          <button type="submit" />
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
