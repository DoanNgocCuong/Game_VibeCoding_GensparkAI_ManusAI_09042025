import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TagLevels from './components/TagLevels';
import Charts from './components/Charts';
import Notification from './components/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem('tags')) || {});
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tasks, tags]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);

    // Update tags
    const updatedTags = { ...tags };
    newTask.tags.forEach(tag => {
      if (!updatedTags[tag]) {
        updatedTags[tag] = {
          xp: 0,
          level: 0,
          color: getRandomColor(),
          taskCount: 0
        };
      }

      const xpToAdd = Math.abs(newTask.value);
      const oldLevel = calculateLevel(updatedTags[tag].xp);
      
      updatedTags[tag].xp += xpToAdd;
      updatedTags[tag].taskCount = (updatedTags[tag].taskCount || 0) + 1;
      
      const newLevel = calculateLevel(updatedTags[tag].xp);
      updatedTags[tag].level = newLevel;
      
      if (newLevel > oldLevel) {
        showNotification(`Tag "${tag}" đã lên level ${newLevel}!`, 'level-up');
      }
    });

    setTags(updatedTags);
    showNotification('Task đã được thêm thành công', 'success');
  };

  const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      showNotification('Không tìm thấy task để xóa', 'error');
      return;
    }

    const task = tasks[taskIndex];
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);

    // Update tags
    const updatedTags = { ...tags };
    task.tags.forEach(tag => {
      if (updatedTags[tag]) {
        const xpToRemove = Math.abs(task.value);
        updatedTags[tag].xp = Math.max(0, updatedTags[tag].xp - xpToRemove);
        updatedTags[tag].level = calculateLevel(updatedTags[tag].xp);
        updatedTags[tag].taskCount = Math.max(0, (updatedTags[tag].taskCount || 0) - 1);
      }
    });

    setTags(updatedTags);
    showNotification('Task đã được xóa', 'info');
  };

  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const showNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const calculateLevel = (xp) => {
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

  const getRandomColor = () => {
    const colors = [
      '#F56565', // red
      '#ED8936', // orange
      '#ECC94B', // yellow
      '#48BB78', // green
      '#38B2AC', // teal
      '#4299E1', // blue
      '#667EEA', // indigo
      '#9F7AEA', // purple
      '#ED64A6', // pink
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Quản Lý Task Theo Giá Trị</h1>
          <p className="text-gray-600 mt-2">Quy đổi công việc thành giá trị và theo dõi sự phát triển của bạn</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TaskForm onAddTask={addTask} />
          <TagLevels tags={tags} />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Task của Hôm Nay</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded transition duration-300"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span className="text-gray-700 font-medium">
                {currentDate.toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <button
                onClick={() => navigateDate(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded transition duration-300"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  setCurrentDate(today);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded transition duration-300 ml-2"
              >
                Hôm nay
              </button>
            </div>
          </div>
          <TaskList
            tasks={tasks}
            currentDate={currentDate}
            onDeleteTask={deleteTask}
            tags={tags}
          />
        </div>

        <Charts tasks={tasks} tags={tags} />

        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; 2023 Quản Lý Task Theo Giá Trị. Tất cả dữ liệu được lưu trữ tại trình duyệt của bạn.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
