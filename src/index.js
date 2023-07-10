import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import { TaskList } from './components/task-list';
import { NewTaskForm } from './components/new-task-form';
import { Footer } from './components/footer';
import './components/index.css';

class App extends Component {
  maxID = 100;

  state = {
    todoData: [],
    filter: 'All',
  };

  createTodoItem(label) {
    return {
      label: label,
      time: new Date(),
      status: null,
      id: this.maxID++,
    };
  }

  onTaskClick = (id) => {
    this.setState(({ todoData }) => {
      todoData.map((elem) => {
        if (elem.id === id && elem.status === null) {
          elem.status = 'completed';
        } else if (elem.id === id && elem.status === 'completed') {
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
    case 'All':
      return items;
    case 'Active':
      return items.filter((elem) => elem.status === null);
    case 'Completed':
      return items.filter((elem) => elem.status === 'completed');
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
    const isActiveItems = todoData.filter((elem) => elem.status === null).length;
    return (
      <section className="main">
        <NewTaskForm title="todos" placeholder="What needs to be done?" onAdded={this.onTaskAdd} />
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
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
