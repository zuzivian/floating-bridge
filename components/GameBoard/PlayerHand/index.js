import React from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import GameCard from '../GameCard';

export default class PlayerHand extends React.Component {
  constructor() {
    super()
    this.animatedValue = new Animated.Value(0);
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1.3)
      }
    ).start();
  }

  render() {
    let playerHand = this.props.cards.map(card => {
      return (
        <GameCard
          key={card.rank+card.suit*13}
          card={card}
          handleCardPress={() => this.props.handleCardPress(card)}
          animate={() => this.animate()}
        />
      );
    });

    return(
      <Animated.View
        style={[
          styles.container,
          {
            bottom: this.animatedValue.interpolate({
              inputRange: [0,1],
              outputRange: [-Layout.window.height/4, 0]
            })
          }
        ]}
      >
        {playerHand}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
