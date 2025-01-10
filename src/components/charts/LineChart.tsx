import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import type { Statistics } from '@/lib/db';

interface LineChartProps {
  data: Statistics[];
  title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destruir o gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Preparar os dados para o gráfico
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: sortedData.map(item => {
          const date = new Date(item.date);
          return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'short'
          });
        }),
        datasets: [{
          label: title,
          data: sortedData.map(item => parseFloat(item.value)),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2563eb',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#2563eb',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937',
            bodyColor: '#1f2937',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            bodyFont: {
              size: 14
            },
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                const unit = data[context.dataIndex].unit;
                return `${value.toLocaleString('pt-BR')} ${unit}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#6b7280'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#f3f4f6'
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#6b7280',
              callback: function(value) {
                return value.toLocaleString('pt-BR');
              }
            }
          }
        }
      }
    };

    // Criar o gráfico
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}; 