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

  componentDidMount() {
    setTimeout(() => this.animate(), 1000);

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

    let cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    let playerHand = cardRanks.map(rank => {
      return (
        <GameCard
          key={rank}
          rank={rank}
          suit={Math.floor(Math.random()*4)}
          width={Layout.window.width/14}
          height={Math.min(Layout.window.width/14*2, Layout.window.height/4)}
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
    height: '25%',
    backgroundColor: Colors.gameBoardBackGround,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
