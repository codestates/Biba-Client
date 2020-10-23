import React from 'react';
import { Radar } from 'react-chartjs-2';

const expData = {
  labels: ['가벼움', '독특함', '부드러움', '가성비', '접근성'],
  datasets: [
    {
      label: 'test',
      data: [60, 53, 57, 50, 83],
      backgroundColor: 'rgba(255, 198, 0, 0.5)',
      borderColor: 'rgba(255, 198, 0, 0.5)',
      fill: true,
      borderWidth: 2,
      hoverBorderWidth: 4,
      pointRadius: 0,
      pointBorderWidth: 3,
      pointHoverRadius: 10,
      pointHitRadius: 40,
    },
  ],
};

export const chart = (): JSX.Element => {
  return (
    <Radar
      options={{
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 33,
            display: false,
          },
          pointLabels: {
            fontSize: 14,
          },
        },
        legend: {
          position: 'right',
          display: false,
        },
      }}
      data={expData}
      height={200}
    />
  );
};

/*
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const expData = {
  labels: ['긍정적', '부정적', '보통'],
  datasets: [
    {
      labels: ['긍정적', '부정적', '보통'],
      data: [60, 13, 27],
      borderWidth: 2,
      hoverBorderWidth: 3,
      backgroundColor: [
        'rgba(238, 102, 121, 1)',
        'rgba(98, 181, 229, 1)',
        'rgba(255, 198, 0, 1)',
      ],
      fill: true,
    },
  ],
};

export const chart = (): JSX.Element => {
  return (
    <Doughnut
      options={{
        legend: {
          display: true,
          position: 'right',
        },
      }}
      data={expData}
      height={120}
    />
  );
};


*/
