import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import './task.css';

export const Task = ({ label, time, styleName, onCheked, onDeleted, startTimer, pauseTimer, minutes, seconds }) => {
  const [edit, setEdit] = useState(false);
  const [stateLabel, setStateLabel] = useState(label);

  const onTaskEdit = () => {
    setEdit(true);
  };

  const changeTask = (event) => {
    setStateLabel(event.target.value);
  };

  const submitTask = (event) => {
    event.preventDefault;
    setEdit(false);
  };

  return (
    <li className={!edit ? styleName : 'editing'}>
      <div className="view">
        <input checked={styleName === 'completed'} className="toggle" type="checkbox" onChange={onCheked}></input>
        <label>
          <span className="title">{stateLabel}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(time, {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onTaskEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {edit ? (
        <form onSubmit={submitTask}>
          <input type="text" className="edit" value={stateLabel} onInput={changeTask}></input>
        </form>
      ) : null}
    </li>
  );
};

Task.defaultProps = {
  label: 'New task',
  time: new Date(),
  styleName: null,
  min: 0,
  sec: 0,
  onCheked: () => {},
  onDeleted: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  time: PropTypes.instanceOf(Date),
  styleName: PropTypes.string,
  min: PropTypes.number,
  sec: PropTypes.number,
  onCheked: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
};
