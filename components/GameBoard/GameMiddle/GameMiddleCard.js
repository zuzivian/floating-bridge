import React from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import GameCard from '../GameCard';

export default class GameMiddleCard extends React.Component {
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
        duration: 500,
        easing: Easing.elastic(0.6)
      }
    ).start();
  }

  render() {
    let card = this.props.card;
    let direction = this.props.direction;

    let bottom = direction === 0 ? -Layout.window.height/4 : 0;
    let left = direction === 1 ? -Layout.window.width/4 : 0;
    bottom = direction === 2 ? Layout.window.height/4 : bottom;
    left = direction === 3 ? Layout.window.width/4 : left;


    return(
      <Animated.View
        style={[
          styles.container,
          {
            bottom: this.animatedValue.interpolate({
              inputRange: [0,1],
              outputRange: [bottom, 0]
            }),
            left: this.animatedValue.interpolate({
              inputRange: [0,1],
              outputRange: [left, 0]
            }),
          }
        ]}
      >
        <GameCard
          key={card}
          card={card}
          handleCardPress={() => {}}
          animate={() => this.animate()}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
