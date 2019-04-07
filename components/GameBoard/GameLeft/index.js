import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

export default class GameLeft extends React.Component {
  render() {

    let images = [
      require('../../../assets/menu.png'),
    ];

    return(
      <View
        style={styles.container}
      >
        <View style={styles.turnImageContainer}>
          <Image
            source={images[0]}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  turnImageContainer: {
    width: Layout.window.width/4,
    height: Layout.window.height/2,
    padding: '5%'
  }
});
