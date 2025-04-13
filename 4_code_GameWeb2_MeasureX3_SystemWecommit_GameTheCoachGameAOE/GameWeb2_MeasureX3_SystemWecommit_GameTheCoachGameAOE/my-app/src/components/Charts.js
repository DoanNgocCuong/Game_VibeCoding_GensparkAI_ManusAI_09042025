import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Charts = ({ tasks, tags }) => {
  const dailyIncomeChartRef = useRef(null);
  const tagDistributionChartRef = useRef(null);
  const dailyIncomeChartInstance = useRef(null);
  const tagDistributionChartInstance = useRef(null);

  useEffect(() => {
    if (dailyIncomeChartRef.current && tagDistributionChartRef.current) {
      createDailyIncomeChart();
      createTagDistributionChart();
    }

    return () => {
      if (dailyIncomeChartInstance.current) {
        dailyIncomeChartInstance.current.destroy();
      }
      if (tagDistributionChartInstance.current) {
        tagDistributionChartInstance.current.destroy();
      }
    };
  }, [tasks, tags]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const createDailyIncomeChart = () => {
    const dates = [];
    const incomes = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dateStr = date.toISOString().split('T')[0];
      const dateDisplay = formatDate(date, 'short');
      
      const dailyTotal = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.toISOString().split('T')[0] === dateStr;
      }).reduce((sum, task) => sum + task.value, 0);
      
      dates.push(dateDisplay);
      incomes.push(dailyTotal);
    }
    
    if (dailyIncomeChartInstance.current) {
      dailyIncomeChartInstance.current.destroy();
    }

    dailyIncomeChartInstance.current = new Chart(dailyIncomeChartRef.current, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Kinh nghiệm (KINH NGHIỆM)',
          data: incomes,
          backgroundColor: incomes.map(value => value >= 0 ? 'rgba(72, 187, 120, 0.7)' : 'rgba(229, 62, 62, 0.7)'),
          borderColor: incomes.map(value => value >= 0 ? 'rgb(47, 133, 90)' : 'rgb(197, 48, 48)'),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.raw);
              }
            }
          }
        }
      }
    });
  };

  const createTagDistributionChart = () => {
    const tagValues = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    
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
    const chartColors = chartLabels.map(tag => tags[tag] ? tags[tag].color : getRandomColor());
    
    if (tagDistributionChartInstance.current) {
      tagDistributionChartInstance.current.destroy();
    }

    if (chartLabels.length === 0) {
      const ctx = tagDistributionChartRef.current.getContext('2d');
      ctx.canvas.height = 150;
      ctx.font = '16px Arial';
      ctx.fillStyle = '#718096';
      ctx.textAlign = 'center';
      ctx.fillText('Không có dữ liệu cho 7 ngày qua', ctx.canvas.width / 2, ctx.canvas.height / 2);
      return;
    }
    
    tagDistributionChartInstance.current = new Chart(tagDistributionChartRef.current, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: chartColors.map(color => color + 'CC'),
          borderColor: chartColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };

  const formatDate = (date, format = 'full') => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    if (format === 'short') {
      return `${day}/${month}`;
    }
    
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const weekday = weekdays[date.getDay()];
    
    return `${weekday}, ${day}/${month}/${date.getFullYear()}`;
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
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thu Nhập Hàng Ngày</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <canvas ref={dailyIncomeChartRef}></canvas>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phân Bố Theo Tag</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <canvas ref={tagDistributionChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Charts; 