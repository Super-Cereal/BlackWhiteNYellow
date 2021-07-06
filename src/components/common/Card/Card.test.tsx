// @ts-nocheck
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import Card from './Card';
import customRender from '../../../renderTest';

describe('testing Card view component', () => {
  it('компонента правильно преобразует дату и период билда', () => {
    const data = {
      status: 'Success',
      buildNumber: 2,
      commitText: 'string',
      commitBranch: 'string',
      commitHash: 'string',
      commitAuthor: 'string',
      date: '21-04-18T18:04:17',
      period: 15000,
      isStatic: true,
    };
    const { getByTestId, rerender } = customRender(<Card {...data} />);

    expect(getByTestId('CardDate').innerHTML).toBe('18 Apr, 18:04');
    expect(getByTestId('CardPeriod').innerHTML).toBe('15 sec');

    rerender(<Card {...data} period={15} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('0 sec');

    rerender(<Card {...data} period={60000} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('1 min, 0 sec');

    rerender(<Card {...data} period={100000} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('1 min, 40 sec');

    rerender(<Card {...data} period={3600000} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('1 hour');

    rerender(<Card {...data} period={3615000} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('1 hour');

    rerender(<Card {...data} period={3675000} />);
    expect(getByTestId('CardPeriod').innerHTML).toBe('1 hour, 1 min');
  });
});
