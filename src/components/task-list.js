import React, { Component } from "react";
import { Task } from "./task";

export class TaskList extends Component {
  state = {
    todoData: [
      {
        label: "Completed task",
        time: "created 17 seconds ago",
        status: null,
        id: 1,
      },
      {
        label: "Editing task",
        time: "created 5 minutes ago",
        status: null,
        id: 2,
      },
      {
        label: "Active task",
        time: "created 5 minutes ago",
        status: null,
        id: 3,
      },
    ],
  };
  onTaskClick = (id) => {
    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData));
      newArr.map((elem) => {
        if (elem.id === id && elem.status === null) {
          elem.status = "completed";
        } else if (elem.id === id && elem.status === "completed") {
          elem.status = null;
        }
      });
      return {
        todoData: newArr,
      };
    });
  };
  onTaskDelete = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };
  render() {
    const elements = this.state.todoData.map((elem) => {
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
            onCheked={() => this.onTaskClick(elem.id)}
            onDeleted={() => this.onTaskDelete(elem.id)}
          />
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
