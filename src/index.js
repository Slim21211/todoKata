import React, { Component } from "react";
import { render } from "react-dom";
import { TaskList } from "./components/task-list";
import { NewTaskForm } from "./components/new-task-form";
import { Footer } from "./components/footer";
import "./components/index.css";

class App extends Component {
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
      todoData.map((elem) => {
        if (elem.id === id && elem.status === null) {
          elem.status = "completed";
        } else if (elem.id === id && elem.status === "completed") {
          elem.status = null;
        }
      });
      return {
        todoData: todoData,
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
    return (
      <section className="main">
        <NewTaskForm />
        <TaskList
          todo={this.state}
          onCheked={(id) => this.onTaskClick(id)}
          onDeleted={(id) => this.onTaskDelete(id)}
        />
        <Footer />
      </section>
    );
  }
}

render(<App />, document.getElementById("root"));
