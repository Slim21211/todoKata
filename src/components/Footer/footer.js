import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskFilter } from '../Task-filter/task-filter';
import './footer.css';

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

Footer.defaultProps = {
  activeItems: 0,
  filter: 'All',
  onFilterChange: () => {},
  onAllDelete: () => {},
};

Footer.propTypes = {
  activeItems: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onAllDelete: PropTypes.func,
};
