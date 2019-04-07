import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import GameCard from '../GameCard';
import GameMiddleCard from './GameMiddleCard';

export default class GameMiddle extends React.Component {
  constructor() {
    super()
  }

  renderCard(card, direction) {
    return (
      <GameMiddleCard
        key={card}
        card={card}
        direction={direction}
      />
    );
  }

  render() {

    if (!this.props.cards || !this.props.cards.length) return null;

    let offset = 4-this.props.lastWinner;

    return(
      <View
        style={styles.container}
      >
        <View style={styles.rowContainer}>
          {this.renderCard(this.props.cards[(offset+2)%4], 2)}
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            {this.renderCard(this.props.cards[(offset+1)%4], 1)}
          </View>
          <View style={styles.columnContainer}>
          {this.renderCard(this.props.cards[(offset+3)%4], 3)}
          </View>
        </View>
        <View style={styles.rowContainer}>
          {this.renderCard(this.props.cards[(offset+0)%4], 0)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
