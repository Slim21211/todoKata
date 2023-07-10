import React, { Component } from "react";
import { Task } from "./task";
import PropTypes from "prop-types";

export class TaskList extends Component {
  render() {
    const { todo, onCheked, onDeleted } = this.props;
    const elements = todo.map((elem) => {
      return (
        <Task
          label={elem.label}
          time={elem.time}
          styleName={elem.status}
          key={elem.id}
          onCheked={() => onCheked(elem.id)}
          onDeleted={() => onDeleted(elem.id)}
          onEdit={() => this.onTaskEdit(elem.id)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todo: PropTypes.array,
  onCheked: PropTypes.func,
  onDeleted: PropTypes.func,
};
