import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskValue, setTaskValue] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem('tags')) || {});

  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem('tags')) || {};
    setTags(savedTags);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskName.length < 2 || taskName.length > 100) {
      showNotification('Tên task phải từ 2-100 ký tự', 'error');
      return;
    }

    if (!taskName || selectedTags.length === 0 || !taskValue) {
      showNotification('Vui lòng điền đầy đủ thông tin', 'error');
      return;
    }

    const value = parseInt(taskValue);
    if (Math.abs(value) < 1 || Math.abs(value) > 1000) {
      showNotification('Giá trị task phải từ 1 đến 1000 KINH NGHIỆM', 'error');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      tags: selectedTags,
      value: value,
      date: taskDate,
      timestamp: Date.now()
    };

    onAddTask(newTask);

    // Reset form
    setTaskName('');
    setTaskValue('');
    setTaskDate(new Date().toISOString().split('T')[0]);
    setSelectedTags([]);
    setTagInput('');
  };

  const addTagToSelection = (tagName) => {
    if (selectedTags.includes(tagName)) {
      showNotification('Tag đã được thêm', 'info');
      return;
    }

    setSelectedTags([...selectedTags, tagName]);
    setTagInput('');
    showNotification(`Đã thêm tag "${tagName}"`, 'success');
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const showNotification = (message, type) => {
    // This will be implemented in a separate Notification component
    console.log(`${type}: ${message}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm Task Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Tên Task</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>
        
        <div>
          <label htmlFor="taskTag" className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="tag-pill inline-flex items-center"
                style={{
                  backgroundColor: tags[tag] ? `${tags[tag].color}33` : '#CBD5E033',
                  color: tags[tag] ? tags[tag].color : '#718096'
                }}
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-xs hover:text-red-500"
                  onClick={() => removeTag(tag)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              id="taskTag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              placeholder="Nhập tag mới hoặc chọn từ danh sách"
              list="tagOptions"
            />
            <button
              type="button"
              onClick={() => tagInput && addTagToSelection(tagInput)}
              className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <datalist id="tagOptions">
            {Object.keys(tags).map(tag => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
        </div>
        
        <div>
          <label htmlFor="taskValue" className="block text-sm font-medium text-gray-700">Giá Trị (KINH NGHIỆM)</label>
          <input
            type="number"
            id="taskValue"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
            min="1"
            max="1000"
          />
          <p className="text-sm text-gray-500 mt-1">
            Nhập số từ 1 đến 1000 cho kinh nghiệm tích lũy, số âm từ -1 đến -1000 cho kinh nghiệm tiêu hao
          </p>
        </div>
        
        <div>
          <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700">Ngày</label>
          <input
            type="date"
            id="taskDate"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Thêm Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm; 