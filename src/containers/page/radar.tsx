import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { BeerDetail } from '../../components/page/BeerDetail';

import { Radar } from 'react-chartjs-2';

export const Chart = (): JSX.Element => {
  const { sparkling, sweet, bitter, accessibility, body } = useSelector(
    (state: RootState) => state.graphData,
  );
  const { beer_name } = useSelector(
    (state: RootState) => state.beerDetail.beerDetail,
  );

  const expData = {
    labels: ['탄산감', '달콤함', '씁쓸함', '접근성', '바디감'],
    datasets: [
      {
        label: beer_name,
        data: [sparkling, sweet, bitter, accessibility, body],
        backgroundColor: 'rgba(255, 198, 0, 0.7)',
        borderColor: 'rgba(255, 198, 0, 0.5)',
        fill: true,
        borderWidth: 2,
        hoverBorderWidth: 4,
        pointRadius: 0,
        pointBorderWidth: 3,
        pointHoverRadius: 10,
        pointHitRadius: 40,
      },
      // {
      //   label: beer_name,
      //   data: [5, 4, 3, 2, 5],
      //   backgroundColor: 'rgba(238, 102, 121, 0.7)',
      //   borderColor: 'rgba(238, 102, 121, 0.5)',
      //   fill: true,
      //   borderWidth: 2,
      //   hoverBorderWidth: 4,
      //   pointRadius: 0,
      //   pointBorderWidth: 3,
      //   pointHoverRadius: 10,
      //   pointHitRadius: 40,
      // },
    ],
  };

  return (
    <Radar
      options={{
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 5,
            stepSize: 1,
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
