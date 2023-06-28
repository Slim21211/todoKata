import React from "react";
import { Task } from "./task";

export const TaskList = ({ todos }) => {
  const elements = todos.map((elem) => {
    let styleName = null;
    if (elem.status === "completed") {
      styleName = "completed";
    }
    if (elem.status === "editing") {
      styleName = "editing";
      return (
        <li className={styleName} key={elem.id}>
          <Task label={elem.label} time={elem.time} />
          <input className="edit" type="text" value="Editing task"></input>
        </li>
      );
    }
    return (
      <li className={styleName} key={elem.id}>
        <Task label={elem.label} time={elem.time} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};
