import { Task } from '../store/slices/taskSlice';
import { Tag } from '../store/slices/tagSlice';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExperienceAnalyticsProps {
  tasks: Task[];
  tags: Record<string, Tag>;
}

type TimeRange = 'daily' | 'monthly' | 'yearly';

const ExperienceAnalytics = ({ tasks, tags }: ExperienceAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date, range: TimeRange) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    switch (range) {
      case 'daily':
        return `${day}/${month}`;
      case 'monthly':
        return `Tháng ${month}/${year}`;
      case 'yearly':
        return `Năm ${year}`;
    }
  };

  // Prepare experience data based on time range
  const getExperienceData = (range: TimeRange) => {
    const dates = [];
    const experiences = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (range) {
      case 'daily':
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
          const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
          
          const dailyTotal = tasks
            .filter(task => {
              const taskDate = new Date(task.date);
              return taskDate >= startOfDay && taskDate <= endOfDay;
            })
            .reduce((sum, task) => sum + task.value, 0);
          
          dates.push(formatDate(date, range));
          experiences.push(dailyTotal);
        }
        break;

      case 'monthly':
        for (let i = 5; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
          const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          const monthlyTotal = tasks
            .filter(task => {
              const taskDate = new Date(task.date);
              return taskDate >= monthStart && taskDate <= monthEnd;
            })
            .reduce((sum, task) => sum + task.value, 0);
          dates.push(formatDate(date, range));
          experiences.push(monthlyTotal);
        }
        break;

      case 'yearly':
        for (let i = 4; i >= 0; i--) {
          const date = new Date(today);
          date.setFullYear(date.getFullYear() - i);
          const yearStart = new Date(date.getFullYear(), 0, 1);
          const yearEnd = new Date(date.getFullYear(), 11, 31);
          const yearlyTotal = tasks
            .filter(task => {
              const taskDate = new Date(task.date);
              return taskDate >= yearStart && taskDate <= yearEnd;
            })
            .reduce((sum, task) => sum + task.value, 0);
          dates.push(formatDate(date, range));
          experiences.push(yearlyTotal);
        }
        break;
    }

    return { dates, experiences };
  };

  // Prepare tag distribution data based on time range
  const getTagDistributionData = (range: TimeRange) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let startDate = new Date(today);

    switch (range) {
      case 'daily':
        startDate.setDate(today.getDate() - 6);
        break;
      case 'monthly':
        startDate.setMonth(today.getMonth() - 5);
        break;
      case 'yearly':
        startDate.setFullYear(today.getFullYear() - 4);
        break;
    }

    const tagValues: Record<string, number> = {};
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= startDate && taskDate <= today;
    });

    filteredTasks.forEach(task => {
      task.tags.forEach(tag => {
        if (!tagValues[tag]) {
          tagValues[tag] = 0;
        }
        tagValues[tag] += Math.abs(task.value);
      });
    });

    return {
      labels: Object.keys(tagValues),
      data: Object.values(tagValues),
      colors: Object.keys(tagValues).map(tag => tags[tag] ? tags[tag].color : '#CBD5E0')
    };
  };

  const { dates, experiences } = getExperienceData(timeRange);
  const tagData = getTagDistributionData(timeRange);

  const experienceData = {
    labels: dates,
    datasets: [
      {
        label: 'Kinh nghiệm (KINH NGHIỆM)',
        data: experiences,
        backgroundColor: experiences.map(value => value >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(229, 62, 62, 0.7)'),
        borderColor: experiences.map(value => value >= 0 ? 'rgb(47, 133, 90)' : 'rgb(197, 48, 48)'),
        borderWidth: 1,
      },
    ],
  };

  const tagDistributionData = {
    labels: tagData.labels,
    datasets: [
      {
        data: tagData.data,
        backgroundColor: tagData.colors.map(color => `${color}CC`),
        borderColor: tagData.colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grace: '5%',
        ticks: {
          callback: function(value: number): string {
            return formatCurrency(value);
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: { raw: number }): string {
            return formatCurrency(context.raw);
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Kinh Nghiệm Theo Thời Gian</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-3 py-1 rounded ${
                timeRange === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Ngày
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1 rounded ${
                timeRange === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tháng
            </button>
            <button
              onClick={() => setTimeRange('yearly')}
              className={`px-3 py-1 rounded ${
                timeRange === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Năm
            </button>
          </div>
        </div>
        <div className="chart-container" style={{ height: '300px' }}>
          <Bar data={experienceData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Phân Bố Theo Tag</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-3 py-1 rounded ${
                timeRange === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Ngày
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1 rounded ${
                timeRange === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tháng
            </button>
            <button
              onClick={() => setTimeRange('yearly')}
              className={`px-3 py-1 rounded ${
                timeRange === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Năm
            </button>
          </div>
        </div>
        <div className="chart-container" style={{ height: '300px' }}>
          {tagData.labels.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Không có dữ liệu
            </div>
          ) : (
            <Pie data={tagDistributionData} options={pieOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceAnalytics; 