import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../../constants/Colors';

export default class GameCard extends React.Component {
  render() {

    // render default
    if (!Number.isInteger(this.props.suit) || this.props.suit < 0 || this.props.suit > 3) {
      this.props.suit = 0;
    }

    let suitImages = [
      require('../../../assets/suits/club.png'),
      require('../../../assets/suits/diamond.png'),
      require('../../../assets/suits/heart.png'),
      require('../../../assets/suits/spade.png'),
    ];

    let suitColor = (this.props.suit == 0 || this.props.suit == 3) ? styles.rankTextDark : styles.rankTextLight;

    let width = this.props.width;
    let height = this.props.height;

    return(
      <View style={[styles.container, { width: 0.95*width, height: 0.8*height, padding: 0.05*width, margin: 0.025*width }]}>
        <View style={styles.rankContainer}>
          <Text style={[suitColor, { fontFamily: 'rubik-bold', fontSize: Math.min(0.35*height, 0.9*width) }]}>
            {this.props.rank}
          </Text>
        </View>
        <View style={styles.suitContainer}>
          <Image
            source={suitImages[this.props.suit]}
            style={{ height: Math.min(0.4*height, 0.5*width), width: Math.min(0.4*height, 0.5*width) }}
            res
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.theme1a,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.theme1e,
    borderRadius: 10,
  },
  rankContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rankTextDark: {
    color: Colors.theme1d,
  },
  rankTextLight: {
    color: Colors.theme1c,
  },
  suitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
