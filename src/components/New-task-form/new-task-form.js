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
    this.setState({
      minutes: Number(event.target.value),
    });
  };

  onChangeSecond = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  };

  render() {
    return (
      <header>
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
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
            type="number"
            min={0}
            onChange={this.onChangeMinute}
            value={this.state.minutes}
            required
          ></input>
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={this.onChangeSecond}
            value={this.state.seconds}
            min={0}
            max={59}
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
