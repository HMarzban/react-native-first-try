import React, {Component} from "react";
import {View, Text,ImageBackground,TouchableOpacity, StyleSheet, AsyncStorage} from "react-native";
import {pubsub} from "../services/pubsub";

export class BasketButton extends Component{

    constructor(){

        super();

        this.state = {
            likeBtn: 0
        }

        pubsub.on("basket", async(_data)=>{
            let BasketHolder = JSON.parse( await AsyncStorage.getItem('BasketHolder') );
            this.setState({
                likeBtn: BasketHolder.length
            })
        });//@pubsub

        pubsub.on("like",(_data)=>{
            this.props.basketList = this.state.likeBtn
            this.setState({
                likeBtn:this.state.likeBtn + _data.count 
            })
        }); //@pubsub

    } //@constructor()

    btn_navigate(){
        this.props.nav.navigate("Basket");
    } //@Function:btn_navigate()

    componentDidMount(){
        pubsub.emit("basket",true);
    } //@Function:componentDidMount()

    render(){
        return(
            <TouchableOpacity style={styles.basket} onPress={this.btn_navigate.bind(this)}>
                <ImageBackground
                    style={styles.bgHol}
                    source={require('./shopping-cart-of-checkered-design.png')} 
                >
                    <View  style={styles.counterHol}>
                        <Text style={styles.counter}>
                            {this.state.likeBtn.toString()}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    } // @Function: render()
} // @Class: BasketButton()

const styles = StyleSheet.create({
    basket:{
        marginRight:10
    },
    counterHol:{
        borderRadius:100,
        minWidth:30,
        minHeight:30,
        right:12,
        top:6,
        flex:1,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center"
    },
    bgHol:{
        width:34,
        height:34,
    },
    counter:{
       color:"#fff",
       fontSize:14,
       minWidth:22,
       textAlign:"center",
        minHeight:22,
       backgroundColor:"#d40606",
       fontWeight:"bold",
       borderRadius:100,
       fontFamily: "IRANSansWeb",
    }
}); //@StyleSheet

export default BasketButton;