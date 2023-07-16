import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export class TaskFilter extends Component {
  buttons = [
    { label: 'All', name: 'all', selected: true },
    { label: 'Active', name: 'active', selected: false },
    { label: 'Completed', name: 'completed', selected: false },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const elements = this.buttons.map((elem) => {
      const isActive = filter === elem.label;
      const styleName = isActive ? 'selected' : null;
      return (
        <li key={elem.name}>
          <button className={styleName} onClick={() => onFilterChange(elem.label)}>
            {elem.label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{elements}</ul>;
  }
}

TaskFilter.defaultProps = {
  filter: 'All',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
