import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import CardUtils from '../../utils/CardUtils';
import GameUtils from '../../utils/GameUtils';
import PlayerHand from './PlayerHand';
import GameMiddle from './GameMiddle';


export default class GameBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      hands: null,
      turn: 0,
      submitted: false,
      trick: []
    };
  }

  cardUtils = new CardUtils();
  gameUtils = new GameUtils();

  componentDidMount() {
    this.setState({ hands: this.cardUtils.generateHands() });
  }

  handleCardPress(card) {
    if (this.state.turn !== 0 || this.state.submitted) return;
    if (!this.gameUtils.isMoveLegal(card)) return;

    this.playCard(card, 0);

    setTimeout(() => { this.makeComputerMove(1) }, 1000);
    setTimeout(() => { this.makeComputerMove(2) }, 2000);
    setTimeout(() => { this.makeComputerMove(3) }, 3000);
  }

  makeComputerMove(player) {
    let hand = this.state.hands[player];
    let legalMoves = hand.filter(card => {
      return this.gameUtils.isMoveLegal(card, this.state.trick);
    });
    if (legalMoves.length === 0) {
      // all cards are legal if player cannot follow suit
      legalMoves = hand;
    }
    this.playCard(this.cardUtils.selectRandom(legalMoves));
  }

  playCard(card) {
    let newHands = this.removeCardFromHand(card, this.state.hands);
    this.setState({ submitted: true, hands: newHands });

    this.playCardToMiddle(card);

    if (this.state.turn === 3) {
      setTimeout(() => {
        this.setState({ trick: [], turn: (this.state.turn+1)%4, submitted: false });
      }, 1000);
    }
    else {
      this.setState({ turn: (this.state.turn+1)%4, submitted: false });
    }
  }

  removeCardFromHand(card, hands) {
    let player, index;
    for (player = 0; player < 4; player++) {
      index = hands[player].findIndex(c => { return c === card });
      if (index !== -1) break;
    }
    hands[player].splice(index, 1);
    return hands;
  }

  playCardToMiddle(card) {
    let trick = this.state.trick;
    trick.push(card);
    this.setState({ trick: trick });
  }

  render() {

    let gameTrick = (
      <GameMiddle
        cards={this.state.trick}
      />
    );

    let playerHand = this.state.hands ?
      <PlayerHand
        cards={this.state.hands[0]}
        testID="PlayerHand"
        handleCardPress={(card) => this.handleCardPress(card)}
      />
      :
      null;

    return(
      <View
        style={styles.container}
      >
        {gameTrick}
        {playerHand}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gameBoardBackGround,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
