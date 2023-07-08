import React, { Component } from "react";
import { TaskFilter } from "./task-filter";

export class Footer extends Component {
  render() {
    const { activeItems, filter, onFilterChange, onAllDelete } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{activeItems} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onAllDelete}>
          Clear completed
        </button>
      </footer>
    );
  }
}
