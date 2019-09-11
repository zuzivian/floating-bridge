import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

export default class GameCard extends React.Component {

  componentDidMount() {
    if (this.props.animate) {
      this.props.animate();
    }
  }

  render() {

    if (!this.props.card) return null;

    let rank = this.props.card.rank;
    let suit = this.props.card.suit;

    // assert suit here
    if (!Number.isInteger(suit) || suit < 0 || suit > 3) {
      suit = 0;
    }

    // more asserts to catch bad ranks
    if (rank == 11) {
      rank = 'J';
    }
    if (rank == 12) {
      rank = 'Q';
    }
    if (rank == 13) {
      rank = 'K';
    }
    if (rank == 14) {
      rank = 'A';
    }

    let suitImages = [
      require('../../../assets/suits/club.png'),
      require('../../../assets/suits/diamond.png'),
      require('../../../assets/suits/heart.png'),
      require('../../../assets/suits/spade.png'),
    ];

    let suitColor = (suit == 0 || suit == 3) ? styles.rankTextDark : styles.rankTextLight;

    let height = Math.min(Layout.window.width/14*2, Layout.window.height/4);
    let width = Layout.window.width/14;

    return(
      <TouchableOpacity
        style={[styles.container, { width: 0.95*width, height: 0.8*height, padding: 0.05*width, margin: 0.025*width }]}
        onPress={() => this.props.handleCardPress()}
      >
        <View style={styles.rankContainer}>
          <Text style={[suitColor, { fontFamily: 'rubik-bold', fontSize: Math.min(0.25*height, 0.9*width) }]}>
            {rank}
          </Text>
        </View>
        <View style={styles.suitContainer}>
          <Image
            source={suitImages[suit]}
            style={{ height: Math.min(0.5*height, 0.6*width), width: Math.min(0.5*height, 0.6*width) }}
            res
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.theme1a,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
  rankContainer: {
    flex: 2,
    padding: "5%",
    // alignItems: 'center',
    justifyContent: 'center'
  },
  rankTextDark: {
    color: Colors.theme1d,
  },
  rankTextLight: {
    color: Colors.theme1c,
  },
  suitContainer: {
    flex: 3,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
