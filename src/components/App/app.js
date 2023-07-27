import React, { Component } from 'react';

import { NewTaskForm } from '../New-task-form/new-task-form';
import { TaskList } from '../Task-list/task-list';
import { Footer } from '../Footer/footer';
import './app.css';

export class App extends Component {
  maxID = 100;

  state = {
    todoData: [],
    filter: 'All',
    isTimerOn: false,
  };

  createTodoItem(label, min, sec) {
    return {
      label: label,
      time: new Date(),
      isActive: true,
      id: this.maxID++,
      minutes: min,
      seconds: sec,
    };
  }

  onTaskClick = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isActive: !oldItem.isActive };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
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

  onTaskAdd = (text, min, sec) => {
    const newTask = this.createTodoItem(text, min, sec);
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
      return items.filter((elem) => elem.isActive);
    case 'Completed':
      return items.filter((elem) => !elem.isActive);
    default:
      return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onAllTasksDelete = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((elem) => elem.isActive);
      return {
        todoData: newArr,
      };
    });
  };

  startTimer = (id) => {
    if (!this.state.isTimerOn) {
      this.timer = setInterval(() => {
        this.setState(({ todoData }) => {
          const idx = todoData.findIndex((elem) => elem.id === id);
          const oldItem = todoData[idx];
          let newItem = { ...oldItem, seconds: oldItem.seconds - 1 };
          if (newItem.seconds < 0) {
            newItem = { ...newItem, minutes: oldItem.minutes - 1, seconds: 59 };
          }
          if (newItem.seconds === 0 && newItem.minutes === 0) {
            clearInterval(this.timer);
          }
          const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
          return {
            todoData: newArr,
            isTimerOn: true,
          };
        });
      }, 1000);
    }
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ isTimerOn: false });
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const isActiveItems = todoData.filter((elem) => elem.isActive).length;
    return (
      <section className="main">
        <NewTaskForm onAdded={this.onTaskAdd} />
        <TaskList
          todo={visibleItems}
          onCheked={(id) => this.onTaskClick(id)}
          onDeleted={(id) => this.onTaskDelete(id)}
          startTimer={(id) => this.startTimer(id)}
          pauseTimer={(id) => this.pauseTimer(id)}
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
