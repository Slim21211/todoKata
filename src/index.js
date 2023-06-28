import React from "react";
import { render } from "react-dom";
import { TaskList } from "./components/task-list";
import { NewTaskForm } from "./components/new-task-form";
import { Footer } from "./components/footer";
import "./components/index.css";

const App = () => {
  const todoData = [
    {
      label: "Completed task",
      time: "created 17 seconds ago",
      status: "completed",
      id: 1,
    },
    {
      label: "Editing task",
      time: "created 5 minutes ago",
      status: "editing",
      id: 2,
    },
    {
      label: "Active task",
      time: "created 5 minutes ago",
      status: null,
      id: 3,
    },
  ];
  return (
    <section className="main">
      <NewTaskForm />
      <TaskList todos={todoData} />
      <Footer />
    </section>
  );
};

render(<App />, document.getElementById("root"));
