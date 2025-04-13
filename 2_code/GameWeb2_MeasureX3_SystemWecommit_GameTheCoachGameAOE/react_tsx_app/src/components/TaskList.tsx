import React from 'react';
import { Task, Tag } from '../types';

interface TaskListProps {
  tasks: Task[];
  currentDate: Date;
  onDeleteTask: (id: number) => void;
  onNavigateDate: (days: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentDate, onDeleteTask, onNavigateDate }) => {
  const formatDate = (date: Date) => {
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${weekday}, ${day}/${month}/${year}`;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day}/${month}/${year}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const currentDateStr = currentDate.toISOString().split('T')[0];
  const dailyTasks = tasks
    .filter(task => task.date.split('T')[0] === currentDateStr)
    .sort((a, b) => b.timestamp - a.timestamp);

  const dailyTotal = dailyTasks.reduce((sum, task) => sum + task.value, 0);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Task của Hôm Nay</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateDate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded transition duration-300"
          >
            ←
          </button>
          <span className="text-gray-700 font-medium">{formatDate(currentDate)}</span>
          <button
            onClick={() => onNavigateDate(1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded transition duration-300"
          >
            →
          </button>
          <button
            onClick={() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              onNavigateDate(0);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded transition duration-300 ml-2"
          >
            Hôm nay
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Tổng tiền:</span>
            <span className={`ml-2 text-lg font-bold ${dailyTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(dailyTotal)}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Số task:</span>
            <span className="ml-2 font-medium">{dailyTasks.length}</span>
          </div>
        </div>
      </div>

      {dailyTasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-xl mb-2">📋</div>
          <p className="text-gray-500">Chưa có task nào cho ngày này. Hãy thêm task mới!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dailyTasks.map(task => (
            <div
              key={task.id}
              className="bg-gray-50 p-4 rounded-lg border-l-4 flex justify-between items-center task-animation"
              style={{ borderLeftColor: '#CBD5E0' }}
            >
              <div className="flex-1">
                <div className="flex items-start">
                  <h3 className="font-medium text-gray-800">{task.name}</h3>
                  <div className="flex flex-wrap">
                    {task.tags.map(tag => (
                      <span
                        key={tag}
                        className="tag-pill ml-2 text-xs"
                        style={{ backgroundColor: '#CBD5E033', color: '#718096' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {formatTime(task.timestamp)}
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-lg font-semibold ${task.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(task.value)}
                </span>
                <button
                  className="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  onClick={() => onDeleteTask(task.id)}
                  title="Xóa task"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 