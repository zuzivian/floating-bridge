import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
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

  componentDidMount() {
    let cards = [];
    let hands = [];
    let utils = new GameUtils();
    // generate a deck of 52 cards
    for (let i=0; i < 4; i++) {
      for (let j = 2; j < 15; j++) {
        cards.push({ rank: j, suit: i });
      }
    }
    // shuffle cards and deal, sorted, to the 4 players
    cards = utils.shuffle(cards);
    for (let i=0; i < 4; i++) {
      let hand = cards.slice(i*13,(i+1)*13);
      hand.sort((a,b) => {
        return a.suit*13+a.rank > b.suit*13+b.rank
      });
      hands.push(hand);
    }
    this.setState({ hands: hands });
  }

  handleCardPress(card) {
    if (this.state.turn !== 0 || this.state.submitted) return;

    this.playCard(card, 0);

    setTimeout(() => { this.playCard(this.state.hands[1][0], 1) }, 1000);
    setTimeout(() => { this.playCard(this.state.hands[2][0], 2) }, 2000);
    setTimeout(() => { this.playCard(this.state.hands[3][0], 3) }, 3000);
  }

  playCard(card, player) {
    this.setState({ submitted: true })
    this.removeCardFromHand(card, player);
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

  removeCardFromHand(card, player) {
    let hands = this.state.hands;
    let index = hands[player].findIndex(c => { return c === card });
    hands[player].splice(index,1);
    this.setState({ hands: hands });
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
