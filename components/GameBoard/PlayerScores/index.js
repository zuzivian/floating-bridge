import React from 'react';
import { StyleSheet, View } from 'react-native';

import PlayerRow from './PlayerRow';

export default class PlayerScores extends React.Component {
  render() {

    return(
      <View
        style={styles.container}
      >
        <PlayerRow dir={'W'} name={'West'} active={this.props.turn === 1} score={this.props.scores[1]} />
        <PlayerRow dir={'N'} name={'North'} active={this.props.turn === 2} score={this.props.scores[2]} />
        <PlayerRow dir={'E'} name={'East'} active={this.props.turn === 3} score={this.props.scores[3]} />
        <PlayerRow dir={'S'} name={'You'} active={this.props.turn === 0} score={this.props.scores[0]} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: "5%",
  },
});
