import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


export default class GameBoard extends React.Component {

  render() {
    return(
      <Overlay
        height={Layout.window.height/2}
        width={Layout.window.width/2}
        borderRadius={Layout.window.width/60}
        isVisible={this.props.show}
        supportedOrientations={['landscape']}
      >
        <View style={styles.container}>
          <Text style={styles.bodyText}>{this.props.text}</Text>
          <Button
            title={this.props.buttonText}
            onPress={this.props.onPress}
          />
        </View>
      </Overlay>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    flex: 2,
    color: Colors.theme1d,
    fontFamily: 'rubik-bold',
    fontSize: Layout.window.height/20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});
