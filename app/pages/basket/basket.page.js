import React, {Component} from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, AsyncStorage} from "react-native";
import {pubsub} from "../../services/pubsub";
import {Buttonic} from "../../components/Buttonic";

export class Basket_page extends Component{
    constructor(){
        super();
        this.state = {
            basketList: null,
            totalPrice:0
        }
        const _self = this
       
    }// @constructor()

    sepereteDigit(_number){
        var input = _number.toString().replace(/[\D\s\._\-]+/g, "");
        input = input ? parseInt( input, 10 ) : 0;
        return ( input === 0 ) ? "" : input.toString();

    }// @function: sepereteDigit()

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "خرید خود را نهای کنید",
          headerRight: ""
        };
    } // @Static: navigationOptions

   async fetchData(){
        try {
            let data = JSON.parse(  await AsyncStorage.getItem('BasketHolder') );
            let price = 0;
            for(let product of data){
                price = price + parseInt( product.price.replace(/[\D\s\._\-]+/g, "") )
                console.log(price)
            }
            //console.log("data basket", data)
            this.setState({
                basketList:data,
                totalPrice: price
            });
            //console.log("state",this.state)
        } catch (error) {
            console.log("err", error)
        }  
    } // @Function: fetchData()

    componentDidMount(){
        this.fetchData();
    } // @Function: componentDidMount()

  
    removeProduct(_dkp){

      
        let newBasket = this.state.basketList.filter(function( obj ) {
                return obj.dkp !== _dkp;
        });
  

        let price = 0;
        for(let product of newBasket){
            price = price + parseInt( product.price.replace(/[\D\s\._\-]+/g, "") )
        }

        this.setState({
            basketList:newBasket,
            totalPrice: price
        });

        AsyncStorage.setItem('BasketHolder',JSON.stringify(newBasket));
        pubsub.emit("basket",{});
       
    } //@Function: fn_removeProduct()


    btnRemoveProduct(_this){
        //console.log('asd',this)
       this.This.removeProduct(this.dkp) 
    }// @Function: removeProduct()
  
    render(){
        return(
            <View>
                <ScrollView>
                    <View style={styles.PriceHolder}>
                        <Text style={styles.Tprice}> {this.sepereteDigit(this.state.totalPrice)} تومان</Text>
                        <Text style={styles.Tprice}> جمع کل خرید </Text>
                    </View>
                    <View>
                        <FlatList
                            data={ this.state.basketList }
                            renderItem={({item}) => ( 
                                <View style={styles.basketList}>
                                    <View style={styles.holder}>
                                            <Image  source={{uri: item.img}} style={{width: 120, height: 120}} /> 
                                            <Text  style={styles.productTitle}>{item.title}</Text>   
                                    </View>
                                    <Text style={styles.productPrice}>{item.price} تومان</Text>
                                    <Buttonic 
                                        Title="حذف"
                                        onPress={this.btnRemoveProduct.bind(Object.assign({dkp:item.dkp, This:this,update:this.setState}))}
                                        style={styles.btnBuy}
                                        btnStyle = {styles.btnBuy}
                                        btnTitleStyle = {styles.btnText}
                                    />
                                </View>
                            )} 
                        />
                    </View>
                </ScrollView>
            </View>
        );
    } //@Function: render()

} //@Class:Basket_page()

const styles = StyleSheet.create({
    btnText:{
        fontSize:16,
        fontWeight:"bold",
        color:"#ff4500",
        fontFamily: "IRANSansWeb",
    },
    btnBuy:{
        position:"absolute",
        left:8,
        bottom:2,
        flex:1,
        padding:6,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        height:40,
        
    },
    Tprice:{
        fontFamily: "IRANSansWeb",
        color:"green"
    },
    PriceHolder:{
        padding:6,
        backgroundColor:"#fff",
        marginTop:4,
        marginBottom:10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    holder:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flexWrap:"wrap"
    },
    productTitle:{
        fontSize:16,
        width:220,
        marginTop:16,
        padding:6,
        fontFamily: "IRANSansWeb",

    },
    productPrice:{
        fontSize:16,
        color:"#5f8336",
        fontWeight:"bold",
        marginBottom:4,
        marginTop:10,
        paddingTop:6,
        borderColor:"#eee",
        borderTopWidth:2,
        fontFamily: "IRANSansWeb",
    },
    basketList:{
        padding:10,
        backgroundColor:"#fff",
        borderRadius:3,
        margin:6,
        elevation:4,
        shadowOffset: { width: 4, height: 4},
        shadowColor: "grey",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    footer:{
        backgroundColor:"#eee",
        padding: 30,
        height:80,
    }
}); //@StyleSheet


export default Basket_page;