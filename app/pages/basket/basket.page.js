import React, {Component} from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, AsyncStorage} from "react-native";
import {pubsub} from "../../services/pubsub";
import {Buttonic} from "../../components/Buttonic";
import {DGKLogo} from "../../components/DGKLogo";

import {InputNumber} from "../../components/InputNumber";

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
        return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }// @function: sepereteDigit()

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: ( <DGKLogo /> ),
            headerRight: ""
        };
    } // @Static: navigationOptions

   async fetchData(){
        try {
            let data = JSON.parse(  await AsyncStorage.getItem('BasketHolder') );
            let price = 0;
            for(let product of data){
                for(let i = 1 ; i <= product.amount ; i++ ){
                    price = price + parseInt( product.price.replace(/[\D\s\._\-]+/g, "") )
                }
                
            }
            //console.log("data basket", data)
            this.setState({
                basketList:data,
                totalPrice: this.sepereteDigit(price)
            });
            //console.log("state",this.state)
        } catch (error) {
            console.log("err", error)
        }  
    } // @Function: fetchData()

    componentDidMount(){
        this.fetchData();
    } // @Function: componentDidMount()

  
   async removeProduct(_dkp){
        try {
            let newBasket = this.state.basketList.filter(function( obj ) {
                    return obj.dkp !== _dkp;
            });
            let price = 0;
            for(let product of newBasket){
                for(let i = 1 ; i <= product.amount ; i++ ){
                    price = price + parseInt( product.price.replace(/[\D\s\._\-]+/g, "") )
                }
            }
            this.setState({
                basketList:newBasket,
                totalPrice: this.sepereteDigit(price)
            });
            if(newBasket.length !== 0 || newBasket !== null ){
                await AsyncStorage.setItem('BasketHolder',JSON.stringify(newBasket));
            }else{
                await AsyncStorage.removeItem('BasketHolder');
            }
            pubsub.emit("basket",{});
        } catch (error) {
              console.log("error", error)  
        }
        
    } //@Function: fn_removeProduct()


    btnRemoveProduct(_this){
        //console.log('asd',this)
       this.This.removeProduct(this.dkp) 
    }// @Function: removeProduct()

    changeOrderAmount(_el){
        this.addProduct(_el.amount, _el.dkp)
    } //@Function: changeOrderAmount()


    async addProduct(_amount, _dkp){
        try {
           let products = JSON.parse( await AsyncStorage.getItem('BasketHolder') );
           products.forEach((product,index) => {
                if(product.dkp == _dkp){
                    products[index]["amount"] = _amount
                }
           });
           this.setState({
                basketList:products
            });
           this.updateTotlaPrice();
           await AsyncStorage.setItem('BasketHolder',JSON.stringify(products));
        } catch (error) {
            console.log("error", error)  
        }
    } //@Function: addProduct()

    
    updateTotlaPrice(){
        let price = 0;
        for(let product of this.state.basketList){
            for(let i = 1 ; i <= product.amount ; i++ ){
                price = price + parseInt( product.price.replace(/[\D\s\._\-]+/g, "") )
            }
        }
        this.setState({
            totalPrice: this.sepereteDigit(price)
        });
    } //@Function: updateTotlaPrice()
  
    render(){
        return(
            <View>
                <ScrollView>
                    <View style={styles.PriceHolder}>
                        <Text style={styles.Tprice}> { this.sepereteDigit(this.state.totalPrice)} تومان</Text>
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
                                    <View style={styles.footer}>
                                        <Text style={styles.productPrice}>{item.price} تومان</Text>
                                        <InputNumber 
                                            onChanged = {(text) => this.changeOrderAmount.bind(this)({amount: text, dkp: item.dkp}) }
                                            style={styles.InputNumber}
                                            value={item.amount || 1}
                                        />
                                        <Buttonic 
                                            Title="حذف"
                                            onPress={this.btnRemoveProduct.bind(Object.assign({dkp:item.dkp, This:this,update:this.setState}))}
                                            style={styles.btnBuy}
                                            btnStyle = {styles.btnBuy}
                                            btnTitleStyle = {styles.btnText}
                                        />
                                    </View>
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
    InputNumber:{
        marginTop:10
    },
    footer:{
        flex:1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderColor:"#eee",
        borderTopWidth:2,
    },
    btnText:{
        fontSize:16,
        color:"#ff4500",
        fontFamily: "IRANSansWeb",
    },
    btnBuy:{
     
        position:"relative",
        top:12,
        //left:8,
        //bottom:2,
       // flex:1,
        padding:6,
       // flexDirection: 'row',
       // justifyContent:"center",
       // alignItems:"center",
        //height:40,

        
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
        marginBottom:4,
        marginTop:10,
        paddingTop:6,
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
    
}); //@StyleSheet


export default Basket_page;