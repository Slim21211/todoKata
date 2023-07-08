import React, { Component } from "react";
import { render } from "react-dom";
import { TaskList } from "./components/task-list";
import { NewTaskForm } from "./components/new-task-form";
import { Footer } from "./components/footer";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./components/index.css";

class App extends Component {
  maxID = 100;
  date = new Date();

  state = {
    todoData: [
      this.createTodoItem("Completed task"),
      this.createTodoItem("Editing task"),
      this.createTodoItem("Active task"),
    ],
    filter: "All",
  };

  createTodoItem(label) {
    return {
      label: label,
      time: `created ${formatDistanceToNow(this.date, {
        includeSeconds: true,
        addSuffix: true,
      })}`,
      status: null,
      id: this.maxID++,
    };
  }

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

  onTaskAdd = (text) => {
    const newTask = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];
      return {
        todoData: newArr,
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "All":
        return items;
      case "Active":
        return items.filter((elem) => elem.status === null);
      case "Completed":
        return items.filter((elem) => elem.status === "completed");
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onAllTasksDelete = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((elem) => elem.status === null);
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const isActiveItems = todoData.filter(
      (elem) => elem.status === null
    ).length;
    return (
      <section className="main">
        <NewTaskForm onAdded={this.onTaskAdd} />
        <TaskList
          todo={visibleItems}
          onCheked={(id) => this.onTaskClick(id)}
          onDeleted={(id) => this.onTaskDelete(id)}
        />
        <Footer
          activeItems={isActiveItems}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onAllDelete={this.onAllTasksDelete}
        />
      </section>
    );
  }
}

render(<App />, document.getElementById("root"));
