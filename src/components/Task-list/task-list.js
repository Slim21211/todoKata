import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Task } from '../Task/task';
import './task-list.css';

export class TaskList extends Component {
  state = {
    minutes: this.props.todo.minutes,
    seconds: this.props.todo.seconds,
  };

  render() {
    const { todo, onCheked, onDeleted, startTimer, pauseTimer } = this.props;
    const elements = todo.map((elem) => {
      const { label, time, isActive, id, minutes, seconds } = elem;
      return (
        <Task
          label={label}
          time={time}
          styleName={isActive ? null : 'completed'}
          key={id}
          minutes={minutes}
          seconds={seconds}
          onCheked={() => onCheked(id)}
          onDeleted={() => onDeleted(id)}
          startTimer={() => startTimer(id)}
          pauseTimer={() => pauseTimer()}
          onEdit={() => this.onTaskEdit(id)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.defaultProps = {
  todo: [],
  onCheked: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  todo: PropTypes.array,
  onCheked: PropTypes.func,
  onDeleted: PropTypes.func,
};
