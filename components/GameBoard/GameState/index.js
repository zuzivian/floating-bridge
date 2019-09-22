import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import GameCard from '../GameCard';

export default class GameState extends React.Component {

  openMenu() {
    return;
  }

  render() {
    return(
      <View
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => this.openMenu()}
        >
          <Text style={styles.darkText}>MENU</Text>
        </TouchableOpacity>
        <View style={styles.stateView}>
          <View style={{ flex: 5, flexDirection: 'column' }}>
            <View style={styles.contract}>
              <Text style={styles.lightText}>1NT</Text>
            </View>
            <View style={styles.bidder}>
              <Text style={styles.lightText}>South</Text>
            </View>
          </View>
          <View style={styles.card}>
            <GameCard
              key={this.props.partnerCard}
              card={this.props.partnerCard}
              direction={3}
              handleCardPress={() => {}}
            />
          </View>
        </View>
        <View style={{flex: 4}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: Math.min(Layout.window.width/14*2, Layout.window.height/4)*2.2,
  },
  lightText: {
    color: Colors.theme1a,
    fontFamily: 'rubik-bold',
    fontSize: Layout.window.height/10*0.5
  },
  darkText: {
    color: Colors.theme1d,
    fontFamily: 'rubik-bold',
    fontSize: Layout.window.height/10*0.5
  },
  menuButton: {
    flex: 2,
    width: '100%',
    backgroundColor: Colors.theme1a,
    borderRadius: Layout.window.width/120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateView: {
    flexDirection: 'row',
    flex: 4,
    width: '100%',
    marginTop: "5%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  contract: {
    flex: 1,
    height: '80%',
    marginRight: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1d,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
  bidder: {
    flex: 1,
    height: '80%',
    marginTop: "5%",
    marginRight: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1c,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
  card: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1a,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
});
