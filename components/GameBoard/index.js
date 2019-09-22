import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import Texts from '../../constants/Texts';
import CardUtils from '../../utils/CardUtils';
import GameUtils from '../../utils/GameUtils';

import PlayerHand from './PlayerHand';
import GameMiddle from './GameMiddle';
import PlayerScores from './PlayerScores';
import GameState from './GameState';
import GameOverlay from '../GameOverlay';

export default class GameBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      overlayShow: true,
      overlayText: Texts.instructions,
      overlayButtonText: Texts.startGame,
      hands: null,
      partnerCard: null,
      partner: 2, // temp
      turn: 0,
      submitted: false,
      lastWinner: 0,
      trick: [],
      tricks: [],
    };
  }

  cardUtils = new CardUtils();
  gameUtils = new GameUtils();

  generateGame() {
    let hands = this.cardUtils.generateHands();
    this.setState({
      hands: hands,
      partnerCard: hands[2][12], // placeholder
    });
  }

  resetGame() {
    this.setState({
      partner: 2, // temp
      turn: 0,
      submitted: false,
      lastWinner: 0,
      trick: [],
      tricks: [],
    });
    this.generateGame();
  }

  endGame() {
    this.setState({
      overlayShow: true,
      overlayText: 'The Game is Over!',
      overlayButtonText: Texts.restartGame,
    });
  }

  onPressOverlayButton() {
    this.setState( {overlayShow: false} );
    // decide what action to do
    if (!this.state.hands) this.generateGame();
    else this.resetGame();
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
    let newHands = this.cardUtils.removeCardFromHand(card, this.state.hands);
    this.setState({ submitted: true, hands: newHands });

    let trick = this.state.trick;
    trick.push(card);
    this.setState({ trick: trick });

    if (this.state.trick.length === 4) {
      this.startNextTrick();
      if (this.state.tricks.length === 13) {
        setTimeout(() => { this.endGame() }, 2000);
      }
    }
    else {
      setTimeout(() => {
        this.setState({ turn: (this.state.turn+1)%4, submitted: false })
      }, 500);
    }
  }

  startNextTrick() {
    let trickWinner = this.gameUtils.getTrickWinner(this.state.trick);
    let nextTurn = (this.state.lastWinner+trickWinner)%4;
    let tricks = this.state.tricks;
    tricks.push(this.state.trick);

    setTimeout(() => {
      this.setState({ tricks: tricks, trick: [], turn: nextTurn, submitted: false, lastWinner: nextTurn });
    }, 1000);

    let delay = 2000;
    for (let i=nextTurn; i<4; i++) {
      if (i === 0) break;
      setTimeout(() => { this.makeComputerMove(i) }, delay);
      delay += 1000;
    }
  }

  render() {

    return(
      <SafeAreaView
        style={styles.container}
      >
        <GameOverlay
          show={this.state.overlayShow}
          text={this.state.overlayText}
          buttonText={this.state.overlayButtonText}
          onPress={() => this.onPressOverlayButton()}
        />
        <View style={styles.topContainer}>
          <View style={{ flex: 1 }}>
            <PlayerScores
              turn={this.state.turn}
              scores={this.gameUtils.getTrickWinners(this.state.tricks)}
            />
          </View>
          <View style={{ flex: 2 }}>
            <GameMiddle
              cards={this.state.trick}
              lastWinner={this.state.lastWinner}
            />
          </View>
          <View style={{ flex: 1 }}>
            <GameState
              turn={this.state.turn}
              partnerCard={this.state.partnerCard}
            />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <PlayerHand
            cards={this.state.hands ? this.state.hands[0] : null}
            testID="PlayerHand"
            handleCardPress={(card) => this.handleCardPress(card)}
          />
        </View>
      </SafeAreaView>
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
    alignItems: 'center',
  }
});
