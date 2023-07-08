import React, { Component } from "react";
import { Task } from "./task";

export class TaskList extends Component {
  render() {
    const { todo, onCheked, onDeleted } = this.props;
    const elements = todo.map((elem) => {
      let styleName = elem.status;
      if (elem.status === "completed") {
        styleName = "completed";
      }
      if (elem.status === "editing") {
        styleName = "editing";
        return (
          <li className={styleName} key={elem.id}>
            <input className="edit" type="text" value={elem.label}></input>
          </li>
        );
      }
      return (
        <li className={styleName} key={elem.id}>
          <Task
            label={elem.label}
            time={elem.time}
            onCheked={() => onCheked(elem.id)}
            onDeleted={() => onDeleted(elem.id)}
          />
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
