import React from 'react';
import PropTypes from 'prop-types';

import { TaskFilter } from '../Task-filter/task-filter';
import './footer.css';

export const Footer = ({ activeItems, filter, onFilterChange, onAllDelete }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeItems} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onAllDelete}>
        Clear completed
      </button>
    </footer>
  );
};

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
