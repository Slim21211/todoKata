import React, { Component } from "react";

export class Task extends Component {
  render() {
    const { label, time, onCheked, onDeleted } = this.props;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onCheked}></input>
        <label>
          <span className="description">{label}</span>
          <span className="created">{time}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
