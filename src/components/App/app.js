import React, { useEffect, useRef, useState } from 'react';

import { NewTaskForm } from '../New-task-form/new-task-form';
import { TaskList } from '../Task-list/task-list';
import { Footer } from '../Footer/footer';
import './app.css';

export const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [stateFilter, setStateFilter] = useState('All');
  const [isTimerOn, setIsTimerOn] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current = 1;
  }, []);

  const createTodoItem = (label, min, sec) => {
    return {
      label: label,
      time: new Date(),
      isActive: true,
      id: Math.floor(Math.random() * 100),
      minutes: min,
      seconds: sec,
    };
  };

  const onTaskClick = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((elem) => elem.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isActive: !oldItem.isActive };
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const onTaskDelete = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((elem) => elem.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const onTaskAdd = (text, min, sec) => {
    const newTask = createTodoItem(text, min, sec);
    setTodoData((todoData) => {
      return [...todoData, newTask];
    });
  };

  const filter = (items, filter) => {
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
  };

  const onFilterChange = (filter) => {
    setStateFilter(filter);
  };

  const onAllTasksDelete = () => {
    setTodoData((todoData) => {
      return todoData.filter((elem) => elem.isActive);
    });
  };

  const startTimer = (id) => {
    if (!isTimerOn) {
      setIsTimerOn(true);
      ref.current = setInterval(() => {
        setTodoData((todoData) => {
          const idx = todoData.findIndex((elem) => elem.id === id);
          if (idx === -1) {
            clearInterval(ref.current);
            setIsTimerOn(false);
            return [...todoData];
          }
          const oldItem = todoData[idx];
          let newItem = { ...oldItem, seconds: oldItem.seconds - 1 };
          if (newItem.seconds < 0) {
            newItem = { ...newItem, minutes: oldItem.minutes - 1, seconds: 59 };
          }
          if (newItem.seconds === 0 && newItem.minutes === 0) {
            clearInterval(ref.current);
            setIsTimerOn(false);
          }
          return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    setIsTimerOn(false);
  };

  const visibleItems = filter(todoData, stateFilter);
  const isActiveItems = todoData.filter((elem) => elem.isActive).length;
  return (
    <section className="main">
      <NewTaskForm onAdded={onTaskAdd} />
      <TaskList
        todo={visibleItems}
        onCheked={(id) => onTaskClick(id)}
        onDeleted={(id) => onTaskDelete(id)}
        startTimer={(id) => startTimer(id)}
        pauseTimer={() => pauseTimer()}
      />
      <Footer
        activeItems={isActiveItems}
        filter={stateFilter}
        onFilterChange={onFilterChange}
        onAllDelete={onAllTasksDelete}
      />
    </section>
  );
};
