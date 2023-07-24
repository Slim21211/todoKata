import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Task } from '../Task/task';
import './task-list.css';

export class TaskList extends Component {
  render() {
    const { todo, onCheked, onDeleted } = this.props;
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
          onCheked={() => onCheked(elem.id)}
          onDeleted={() => onDeleted(elem.id)}
          onEdit={() => this.onTaskEdit(elem.id)}
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
