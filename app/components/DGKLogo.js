import React, { Component } from 'react';
import { View, Image } from 'react-native';

export class DGKLogo extends Component {
  render() {
    return (
      <View>
        <Image
          style={{
            marginLeft: 10, width: 100, height: 70, resizeMode: 'contain',
          }}
          source={require('../assets/img/logo.png')}
        />
      </View>
    );
  }// @Function: render()
} // @Class: DGKLogo()

export default DGKLogo;
