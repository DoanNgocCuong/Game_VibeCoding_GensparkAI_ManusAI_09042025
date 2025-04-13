import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Task, Tag } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ChartsProps {
  tasks: Task[];
  tags: Record<string, Tag>;
}

const Charts: React.FC<ChartsProps> = ({ tasks, tags }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getLast7DaysData = () => {
    const dates = [];
    const incomes = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dateStr = date.toISOString().split('T')[0];
      const day = date.getDate();
      const month = date.getMonth() + 1;
      
      const dailyTotal = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.toISOString().split('T')[0] === dateStr;
      }).reduce((sum, task) => sum + task.value, 0);
      
      dates.push(`${day}/${month}`);
      incomes.push(dailyTotal);
    }
    
    return { dates, incomes };
  };

  const getTagDistributionData = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    
    const tagValues: Record<string, number> = {};
    
    tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= sevenDaysAgo && taskDate <= today;
    }).forEach(task => {
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
      colors: Object.keys(tagValues).map(tag => tags[tag]?.color || '#CBD5E0')
    };
  };

  const { dates, incomes } = getLast7DaysData();
  const tagData = getTagDistributionData();

  const dailyIncomeChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Kinh nghiệm (KINH NGHIỆM)',
        data: incomes,
        backgroundColor: incomes.map(value => value >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(229, 62, 62, 0.7)'),
        borderColor: incomes.map(value => value >= 0 ? 'rgb(47, 133, 90)' : 'rgb(197, 48, 48)'),
        borderWidth: 1
      }
    ]
  };

  const tagDistributionChartData = {
    labels: tagData.labels,
    datasets: [
      {
        data: tagData.data,
        backgroundColor: tagData.colors.map(color => `${color}CC`),
        borderColor: tagData.colors,
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => formatCurrency(context.raw)
        }
      }
    }
  };

  const pieChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thu Nhập Hàng Ngày</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <Bar data={dailyIncomeChartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phân Bố Theo Tag</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          {tagData.labels.length > 0 ? (
            <Pie data={tagDistributionChartData} options={pieChartOptions} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Không có dữ liệu cho 7 ngày qua
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts; 