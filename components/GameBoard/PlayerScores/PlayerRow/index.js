import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

export default class PlayerRow extends React.Component {
  render() {

    return(
      <View
        style={styles.container}
      >
        <View style={[styles.dirContainer, this.props.active ? styles.dirContainerActive : {} ]}>
          <Text style={styles.lightText}>{this.props.dir}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.nameContainer}>
          <Text style={styles.darkText}>{this.props.name}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.scoreContainer}>
          <Text style={styles.darkText}>{this.props.score}</Text>
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: Layout.window.height/10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    flex: 0.3,
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
  dirContainer: {
    flex: 1,
    height: '80%',
    width: Layout.window.height/10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1c,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
  dirContainerActive: {
    backgroundColor: Colors.theme1d,
  },
  nameContainer: {
    flex: 4,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1a,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
  scoreContainer: {
    flex: 1,
    height: '80%',
    width: Layout.window.height/10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme1a,
    borderColor: Colors.theme1e,
    borderRadius: Layout.window.width/120,
  },
});
