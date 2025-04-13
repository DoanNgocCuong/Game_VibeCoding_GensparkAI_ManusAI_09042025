import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskValue, setTaskValue] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const savedTags = localStorage.getItem('tags');
    if (savedTags) {
      setAvailableTags(Object.keys(JSON.parse(savedTags)));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || selectedTags.length === 0 || !taskValue || !taskDate) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const value = parseInt(taskValue);
    if (Math.abs(value) < 1 || Math.abs(value) > 1000) {
      alert('Giá trị task phải từ 1 đến 1000 KINH NGHIỆM');
      return;
    }

    const newTask: Task = {
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
    setTaskDate('');
    setSelectedTags([]);
    setTagInput('');
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm Task Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Tên Task
          </label>
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
          <label htmlFor="taskTag" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="tag-pill inline-flex items-center"
                style={{ backgroundColor: '#CBD5E033', color: '#718096' }}
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-xs hover:text-red-500"
                  onClick={() => removeTag(tag)}
                >
                  ×
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
              list="tagOptions"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              placeholder="Nhập tag mới hoặc chọn từ danh sách"
            />
            <button
              type="button"
              onClick={addTag}
              className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              +
            </button>
          </div>
          <datalist id="tagOptions">
            {availableTags.map(tag => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="taskValue" className="block text-sm font-medium text-gray-700">
            Giá Trị (KINH NGHIỆM)
          </label>
          <input
            type="number"
            id="taskValue"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
            min="-1000"
            max="1000"
          />
          <p className="text-sm text-gray-500 mt-1">
            Nhập số từ 1 đến 1000 cho kinh nghiệm tích lũy, số âm từ -1 đến -1000 cho kinh nghiệm tiêu hao
          </p>
        </div>

        <div>
          <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700">
            Ngày
          </label>
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