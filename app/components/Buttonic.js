import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native"




export class Buttonic extends Component {
    constructor(){
        super();
    }


    render(){

        return(
            <TouchableOpacity style={this.props.btnStyle} onPress={this.props.onPress}>
                <Text style={[this.props.btnTitleStyle]}>{this.props.Title}</Text>
            </TouchableOpacity>
        );
    }
} //@Class: Buttonic()

export default Buttonic