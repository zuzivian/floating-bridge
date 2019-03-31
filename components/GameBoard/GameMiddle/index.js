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
        key={this.props.cards[0]}
        card={this.props.cards[0]}
        direction={0}
      />
    );
  }

  render() {

    if (!this.props.cards || !this.props.cards.length) return null;

    return(
      <View
        style={styles.container}
      >
        <View style={styles.rowContainer}>
          <GameMiddleCard
            key={2}
            card={this.props.cards[2]}
            direction={2}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <GameMiddleCard
              key={1}
              card={this.props.cards[1]}
              direction={1}
            />
          </View>
          <View style={styles.columnContainer}>
            <GameMiddleCard
              key={3}
              card={this.props.cards[3]}
              direction={3}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <GameMiddleCard
            key={0}
            card={this.props.cards[0]}
            direction={0}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: "35%",
    flexDirection: 'column',
    width: '50%',
    height: '50%',
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
