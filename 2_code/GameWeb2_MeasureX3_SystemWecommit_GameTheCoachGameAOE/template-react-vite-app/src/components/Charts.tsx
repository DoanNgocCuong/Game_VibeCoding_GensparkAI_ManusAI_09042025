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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  tasks: Task[];
  tags: Record<string, Tag>;
}

const Charts = ({ tasks, tags }: ChartsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  };

  // Prepare daily income chart data
  const dates = [];
  const incomes = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const dateStr = date.toISOString().split('T')[0];
    const dateDisplay = formatDate(date);
    
    const dailyTotal = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.toISOString().split('T')[0] === dateStr;
    }).reduce((sum, task) => sum + task.value, 0);
    
    dates.push(dateDisplay);
    incomes.push(dailyTotal);
  }

  const dailyIncomeData = {
    labels: dates,
    datasets: [
      {
        label: 'Kinh nghiệm (KINH NGHIỆM)',
        data: incomes,
        backgroundColor: incomes.map(value => value >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(229, 62, 62, 0.7)'),
        borderColor: incomes.map(value => value >= 0 ? 'rgb(47, 133, 90)' : 'rgb(197, 48, 48)'),
        borderWidth: 1,
      },
    ],
  };

  const dailyIncomeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatCurrency(value),
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => formatCurrency(context.raw),
        },
      },
    },
  };

  // Prepare tag distribution chart data
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const tagValues: Record<string, number> = {};
  const recentTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= sevenDaysAgo && taskDate <= today;
  });

  recentTasks.forEach(task => {
    task.tags.forEach(tag => {
      if (!tagValues[tag]) {
        tagValues[tag] = 0;
      }
      tagValues[tag] += Math.abs(task.value);
    });
  });

  const chartLabels = Object.keys(tagValues);
  const chartData = chartLabels.map(tag => tagValues[tag]);
  const chartColors = chartLabels.map(tag => tags[tag] ? tags[tag].color : '#CBD5E0');

  const tagDistributionData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColors.map(color => `${color}CC`),
        borderColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  const tagDistributionOptions = {
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thu Nhập Hàng Ngày</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <Bar data={dailyIncomeData} options={dailyIncomeOptions} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phân Bố Theo Tag</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          {chartLabels.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Không có dữ liệu cho 7 ngày qua
            </div>
          ) : (
            <Pie data={tagDistributionData} options={tagDistributionOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts; 