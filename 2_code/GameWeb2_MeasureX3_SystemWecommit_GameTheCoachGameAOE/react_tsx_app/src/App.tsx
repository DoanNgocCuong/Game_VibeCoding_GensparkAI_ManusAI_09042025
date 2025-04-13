import React, { useState, useEffect } from 'react';
import { Task, Tag } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TagLevels from './components/TagLevels';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tags, setTags] = useState<Record<string, Tag>>(() => {
    const savedTags = localStorage.getItem('tags');
    return savedTags ? JSON.parse(savedTags) : {};
  });

  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tasks, tags]);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Update tags
    newTask.tags.forEach(tag => {
      setTags(prevTags => {
        const updatedTags = { ...prevTags };
        if (!updatedTags[tag]) {
          updatedTags[tag] = {
            xp: 0,
            level: 0,
            color: getRandomColor(),
            taskCount: 0
          };
        }
        updatedTags[tag].xp += Math.abs(newTask.value);
        updatedTags[tag].taskCount += 1;
        updatedTags[tag].level = calculateLevel(updatedTags[tag].xp);
        return updatedTags;
      });
    });
  };

  const deleteTask = (taskId: number) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (!taskToDelete) return;

    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

    // Update tags
    taskToDelete.tags.forEach(tag => {
      setTags(prevTags => {
        const updatedTags = { ...prevTags };
        if (updatedTags[tag]) {
          updatedTags[tag].xp = Math.max(0, updatedTags[tag].xp - Math.abs(taskToDelete.value));
          updatedTags[tag].taskCount = Math.max(0, updatedTags[tag].taskCount - 1);
          updatedTags[tag].level = calculateLevel(updatedTags[tag].xp);
        }
        return updatedTags;
      });
    });
  };

  const navigateDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const getRandomColor = () => {
    const colors = [
      '#F56565', '#ED8936', '#ECC94B', '#48BB78', '#38B2AC',
      '#4299E1', '#667EEA', '#9F7AEA', '#ED64A6'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateLevel = (xp: number) => {
    const LEVEL_XP_BASE = 100;
    const LEVEL_XP_MULTIPLIER = 1.5;
    let level = 0;
    let requiredXP = LEVEL_XP_BASE;
    
    while (xp >= requiredXP) {
      level++;
      xp -= requiredXP;
      requiredXP = Math.floor(LEVEL_XP_BASE * Math.pow(LEVEL_XP_MULTIPLIER, level));
    }
    
    return level;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">Quản Lý Task Theo Giá Trị</h1>
        <p className="text-gray-600 mt-2">Quy đổi công việc thành giá trị và theo dõi sự phát triển của bạn</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskForm onAddTask={addTask} />
        <TagLevels tags={tags} />
      </div>

      <TaskList 
        tasks={tasks}
        currentDate={currentDate}
        onDeleteTask={deleteTask}
        onNavigateDate={navigateDate}
      />

      <Charts tasks={tasks} tags={tags} />

      <Dashboard tasks={tasks} tags={tags} />
    </div>
  );
};

export default App;
