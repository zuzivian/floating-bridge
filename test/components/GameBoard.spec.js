import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import GameBoard from '../../components/GameBoard';

describe('GameBoard', () => {
  describe('displaying the board', () => {
    let getByTestId;

    jest.useFakeTimers();

    beforeEach(() => {
      ({ getByTestId } = render(<GameBoard />));
    });

    jest.runOnlyPendingTimers()
    jest.runAllTimers()

    it('player starts with 13 cards in hand', () => {
      expect(getByTestId('PlayerHand').props.cards).toHaveLength(13);
    });
  });
});
