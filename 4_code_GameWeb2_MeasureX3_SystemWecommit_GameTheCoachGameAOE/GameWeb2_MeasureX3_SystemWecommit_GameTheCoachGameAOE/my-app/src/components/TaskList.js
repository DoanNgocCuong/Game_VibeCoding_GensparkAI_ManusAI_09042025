import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks, currentDate, onDeleteTask, tags }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day}/${month}/${year}`;
  };

  const currentDateStr = currentDate.toISOString().split('T')[0];
  const dailyTasks = tasks
    .filter(task => task.date === currentDateStr)
    .sort((a, b) => b.timestamp - a.timestamp);

  const dailyTotal = dailyTasks.reduce((sum, task) => sum + task.value, 0);

  if (dailyTasks.length === 0) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Task của Hôm Nay</h2>
          <div className="text-gray-700 font-medium">
            {currentDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 text-xl mb-2">
            <i className="fas fa-tasks"></i>
          </div>
          <p className="text-gray-500">Chưa có task nào cho ngày này. Hãy thêm task mới!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Task của Hôm Nay</h2>
        <div className="text-gray-700 font-medium">
          {currentDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
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
      
      <div className="space-y-3">
        {dailyTasks.map(task => (
          <div
            key={task.id}
            className="bg-gray-50 p-4 rounded-lg border-l-4 flex justify-between items-center task-animation"
            style={{ borderLeftColor: task.tags[0] && tags[task.tags[0]] ? tags[task.tags[0]].color : '#CBD5E0' }}
          >
            <div className="flex-1">
              <div className="flex items-start">
                <h3 className="font-medium text-gray-800">{task.name}</h3>
                <div className="flex flex-wrap">
                  {task.tags.map(tag => (
                    <span
                      key={tag}
                      className="tag-pill ml-2 text-xs"
                      style={{
                        backgroundColor: tags[tag] ? `${tags[tag].color}33` : '#CBD5E033',
                        color: tags[tag] ? tags[tag].color : '#718096'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {formatTime(new Date(task.timestamp))}
              </div>
            </div>
            <div className="flex items-center">
              <span className={`text-lg font-semibold ${task.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(task.value)}
              </span>
              <button
                className="ml-4 text-gray-400 hover:text-red-500 delete-task transition-colors duration-200"
                onClick={() => onDeleteTask(task.id)}
                title="Xóa task"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 