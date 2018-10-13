/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, } from 'react-native';
import AppNavigator from "./app/AppNavigator";

export default class App extends Component {
  render() {
    return (
        <AppNavigator/>
    );
  }
} //@Class: App

const styles = StyleSheet.create({
});
