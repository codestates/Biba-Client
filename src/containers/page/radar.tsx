import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { GraphData } from '../../modules/beerdetail';
import { BeerDetail } from '../../components/page/BeerDetail';

import { Radar } from 'react-chartjs-2';
import { ChartComponentProps } from 'react-chartjs-2';

import {
  chartYellow1,
  chartYellow2,
  chartAccent1,
  chartAccent2,
} from '../../components/nav/color';

export const Chart = (): JSX.Element => {
  const mainData = useSelector((state: RootState) => state.graphData);
  const compareData = useSelector((state: RootState) => state.compareData);
  const mainName = useSelector(
    (state: RootState) => state.beerDetail.beerDetail.beer_name,
  );
  const compareName = useSelector(
    (state: RootState) => state.compareBeer.compareBeer.beer_name,
  );

  const expData = {
    labels: ['탄산감', '달콤함', '씁쓸함', '접근성', '바디감'],
    datasets: [
      {
        label: mainName,
        data: [
          mainData.sparkling,
          mainData.sweet,
          mainData.bitter,
          mainData.accessibility,
          mainData.body,
        ],
        pointBackgroundColor: chartYellow2,
        backgroundColor: chartYellow1,
        borderColor: chartYellow2,
        fill: true,
        borderWidth: 2,
        hoverBorderWidth: 4,
        pointRadius: 0,
        pointBorderWidth: 3,
        pointHoverRadius: 10,
        pointHitRadius: 40,
      },
      {
        label: compareName,
        data: [
          compareData.sparkling,
          compareData.sweet,
          compareData.bitter,
          compareData.accessibility,
          compareData.body,
        ],
        pointBackgroundColor: chartAccent2,
        backgroundColor: chartAccent1,
        borderColor: chartAccent2,
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
  if (compareName === '') {
    expData.datasets.pop();
  }
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
      height={240}
    />
  );
};
