import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import './task.css';

export class Task extends Component {
  state = {
    edit: false,
    label: this.props.label,
  };

  onTaskEdit = () => {
    this.setState({
      edit: true,
    });
  };

  changeTask = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  submitTask = (event) => {
    event.preventDefault();
    this.setState({
      edit: false,
    });
  };

  render() {
    const { time, styleName, onCheked, onDeleted } = this.props;
    return (
      <li className={!this.state.edit ? styleName : 'editing'}>
        <div className="view">
          <input checked={styleName === 'completed'} className="toggle" type="checkbox" onChange={onCheked}></input>
          <label>
            <span className="description">{this.state.label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(time, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.onTaskEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.state.edit ? (
          <form onSubmit={this.submitTask}>
            <input type="text" className="edit" value={this.state.label} onInput={this.changeTask}></input>
          </form>
        ) : null}
      </li>
    );
  }
}

Task.defaultProps = {
  label: 'New task',
  time: new Date(),
  styleName: null,
  key: Math.floor(Math.random() * 100),
  onCheked: () => {},
  onDeleted: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  time: PropTypes.string,
  styleName: PropTypes.string,
  key: PropTypes.number,
  onCheked: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
};
