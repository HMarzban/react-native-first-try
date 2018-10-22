import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
} from 'react-native';


export class InputNumber extends Component {
  constructor() {
    super();
    this.state = {
      TextInput: 1,
    };
  } // @constructor()


  componentDidMount() {
    this.setState({
      TextInput: this.props.value || 1,
    });
  }


  onChanged(text) {
    const vote = text.replace(/[^0-9]/g, '');
    this.props.onChanged(vote);

    this.setState({
      TextInput: vote,
    });
  } // @Function: onChanged()

  voteDown() {
    const voteDown = parseInt(this.state.TextInput) - 1;

    if (voteDown >= 1) {
      this.setState({
        TextInput: voteDown,
      });
      this.props.onChanged(voteDown);
    }
  } // @Function: voteDown()

  voteUp() {
    const voteUp = parseInt(this.state.TextInput) + 1;

    this.setState({
      TextInput: voteUp,
    });

    this.props.onChanged(voteUp);
  } // @Function: voteUp()

  render() {
    return (
      <View style={[styles.vote, this.props.style]}>
        <TouchableOpacity style={styles.btnTouch} onPress={this.voteUp.bind(this)}>
          <Text style={styles.p}>+</Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="numeric"
          style={{
            height: 30,
            lineHeight: 26,
            fontSize: 16,
            padding: 0,
            width: 40,
            fontFamily: 'IRANSansWeb',
            textAlign: 'center',
            backgroundColor: '#aaa',
          }}
          onChangeText={text => this.onChanged(text)}
          value={this.state.TextInput.toString()}
        />
        <TouchableOpacity style={styles.btnTouch} onPress={this.voteDown.bind(this)}>
          <Text style={styles.p}>-</Text>
        </TouchableOpacity>
      </View>
    );
  } // @Function: render()
} // Class: InputNumber()

const styles = StyleSheet.create({
  vote: {
    // flex:1,
    overflow: 'hidden',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  btnTouch: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#eee',
    padding: 4,
    width: 46,
    height: 30,

  },
  p: {
    fontFamily: 'IRANSansWeb',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 24,

  },
});

export default InputNumber;
