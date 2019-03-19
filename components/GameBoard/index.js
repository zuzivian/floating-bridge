import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import PlayerHand from './PlayerHand';

export default class GameBoard extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <PlayerHand />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gameBoardBackGround,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
