import React, { Component } from "react";
import { render } from "react-dom";
import { TaskList } from "./components/task-list";
import { NewTaskForm } from "./components/new-task-form";
import { Footer } from "./components/footer";
import "./components/index.css";

class App extends Component {
  render() {
    return (
      <section className="main">
        <NewTaskForm />
        <TaskList />
        <Footer />
      </section>
    );
  }
}

render(<App />, document.getElementById("root"));
