import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthChart = ({clicks, signups}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const getLast30Days = () => {
      const days = [];
      const date = new Date();
      for (let i = 0; i < 30; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(date.getDate() - i);
        days.push(currentDate.toLocaleDateString('default', { month: 'short', day: 'numeric' }));
      }
      return days.reverse();
    };

    const getLabelsForEveryOtherDay = (days) => {
      return days.map((day, index) => index % 2 === 0 ? day : '');
    };

    const getMonthlyData = () => {
      const days = getLast30Days();
      return {
        labels: getLabelsForEveryOtherDay(days),
        datasets: [
          {
            label: 'Sign Ups',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
            fill: false,
            borderColor: 'rgba(46, 204, 113, 0.5)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(46, 204, 113, 0.5)',
            pointHoverBackgroundColor: 'rgba(46, 204, 113, 1)',
            pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
          },
          {
            label: 'Clicks',
            data: clicks.map((val, i)=>val.count),
            fill: false,
            borderColor: 'rgba(52, 152, 219, 0.5)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(52, 152, 219, 0.5)',
            pointHoverBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
          }
        ]
      };
    };

    const monthChart = new Chart(ctx, {
      type: 'line',
      data: getMonthlyData(),
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Last 30 Days'
          }
        }
      }
    });

    return () => {
      monthChart.destroy();
    };
  }, []);

  return (
    <div style={{ width: '80%', margin: 'auto', backgroundColor: "#333", borderRadius: "10px", marginTop: '4em', marginBottom: '4em' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MonthChart;
