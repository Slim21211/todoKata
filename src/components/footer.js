import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskFilter } from './task-filter';

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
  filter: 'All',
};

Footer.propTypes = {
  filter: PropTypes.string,
  activeItems: PropTypes.number,
  onFilterChange: PropTypes.func,
  onAllDelete: PropTypes.func,
};
