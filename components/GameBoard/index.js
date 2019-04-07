import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import CardUtils from '../../utils/CardUtils';
import GameUtils from '../../utils/GameUtils';

import PlayerHand from './PlayerHand';
import GameMiddle from './GameMiddle';
import GameLeft from './GameLeft';
import GameRight from './GameRight';


export default class GameBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      hands: null,
      turn: 0,
      submitted: false,
      lastWinner: 0,
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
    if (!this.gameUtils.isMoveLegal(card, this.state.trick, this.state.hands[0])) return;

    this.playCard(card, 0);

    for (let i=1; i<=4-this.state.trick.length; i++) {
      setTimeout(() => { this.makeComputerMove(i) }, i*1000);
    }
  }

  makeComputerMove(player) {
    let hand = this.state.hands[player];
    if (!hand.length) return;

    let legalMoves = hand.filter(card => {
      return this.gameUtils.isMoveLegal(card, this.state.trick, hand);
    });
    this.playCard(this.cardUtils.selectRandom(legalMoves));
  }

  playCard(card) {
    let newHands = this.removeCardFromHand(card, this.state.hands);
    this.setState({ submitted: true, hands: newHands });

    this.playCardToMiddle(card);

    if (this.state.trick.length === 4) {

      let trickWinner = this.gameUtils.getTrickWinner(this.state.trick);
      let nextTurn = (this.state.lastWinner+trickWinner)%4;

      setTimeout(() => {
        this.setState({ trick: [], turn: nextTurn, submitted: false, lastWinner: nextTurn });
      }, 1000);

      let delay = 2000;
      for (let i=nextTurn; i<4; i++) {
        if (i === 0) break;
        setTimeout(() => { this.makeComputerMove(i) }, delay);
        delay += 1000;
      }
    }
    else {
      setTimeout(() => {
        this.setState({ turn: (this.state.turn+1)%4, submitted: false })
      }, 500);
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

    let playerHand = this.state.hands ?
      <PlayerHand
        cards={this.state.hands ? this.state.hands[0] : null}
        testID="PlayerHand"
        handleCardPress={(card) => this.handleCardPress(card)}
      />
      :
      null;

    return(
      <View
        style={styles.container}
      >
        <View style={styles.topContainer}>
          <View style={{ flex: 1 }}>
            <GameLeft
            />
          </View>
          <View style={{ flex: 2 }}>
            <GameMiddle
              cards={this.state.trick}
              lastWinner={this.state.lastWinner}
            />
          </View>
          <View style={{ flex: 1 }}>
            <GameRight
              turn={this.state.turn}
            />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {playerHand}
        </View>
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
  topContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
