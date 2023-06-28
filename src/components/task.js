import React from "react";

export const Task = (props) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox"></input>
      <label>
        <span className="description">{props.label}</span>
        <span className="created">{props.time}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};
