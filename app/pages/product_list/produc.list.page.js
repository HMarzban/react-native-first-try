import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity ,FlatList,ScrollView } from "react-native";
import { BasketButton } from "../../components/basket";
import {DGKLogo} from "../../components/DGKLogo";

import * as Json_tv from "../../services/json/tv.json";
import * as Json_labtop from "../../services/json/labtop.json";
import * as Json_tablet from "../../services/json/tablet.json";
import * as Json_headphon from "../../services/json/headphon.json";
import * as Json_consoleGame from "../../services/json/consoleGame.json";

export class Product_list extends Component{

    constructor(){
        super();

        this.state = {
            productListList: null,
            catID: "0"
        }
    } //@constructor()

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: ( <DGKLogo /> ),
            headerRight: (
            <BasketButton nav={navigation}/>
            ),
        };
    } //@Static: navigationOptions
    
    fetchProducts(_catId){
       // console.log("catID im In",_catId)
        this.state.catID = _catId;
    
        if(_catId == "consoleGame"){
            return Json_consoleGame.products;
        }else if(_catId == "headphon"){
            return Json_headphon.products;
        }else if(_catId == "labtop"){
            return Json_labtop.products;
        }else if(_catId == "tablet"){
            return Json_tablet.products;
        }else if(_catId == "tv"){
            return Json_tv.products;
        }

    } //@Function: fetchProducts()

    btn_navigate(){
        this.nav.props.navigation.navigate('Product',{
            product: this.item,
            catID:this.catID
        });
    } //@Function: btn_navigate()

    render(){

        let { navigation } = this.props;
        let CatID = navigation.getParam('catID', 'tv');

        return(
        <View style={{direction:"rtl"}}>
            <ScrollView >
               <FlatList
                   data={this.fetchProducts(CatID)}
                   renderItem={({item}) => ( 
                       <View style={styles.row}>
                       <TouchableOpacity style={[styles.box, styles.box2]} onPress={this.btn_navigate.bind(Object.assign({nav:this,item:item[0],catID:CatID}))}>
                            <View style={styles.cholder}>
                                <View style={styles.holder}>
                                    <Image  source={{uri: item[0].img}} style={{width: 120, height: 120}} />    
                                </View>
                            <Text style={styles.productTitle}>{item[0].title}</Text>
                                <Text style={styles.productPrice}>{item[0].price} تومان</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity style={[styles.box, styles.box2]} onPress={this.btn_navigate.bind(Object.assign({nav:this,item:item[1],catID:CatID}))}>
                            <View style={styles.cholder}>
                            <View style={styles.holder}>
                            <Image  source={{uri: item[1].img}} style={{width: 120, height: 120}} />
                                </View>
                                <Text style={styles.productTitle}>{item[1].title}</Text>
                                <Text style={styles.productPrice}>{item[1].price} تومان</Text>
                            </View>
                       </TouchableOpacity> 
                   </View>)}
               />
               </ScrollView>
       </View>
        );
    }//@Function: render()

} //@Class: Product_list

export default  Product_list;

const styles = StyleSheet.create({
    productTitle:{
        padding:4,
        fontSize:16,
        fontFamily: "IRANSansWeb",
    },
    productPrice:{
        padding:6,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        fontFamily: "IRANSansWeb",
    },
    holder:{
        height:120,
        alignItems:"center",
        justifyContent: 'center',
    },
    cholder:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding:6,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
    },
    text:{
        color:"#fff",
        fontSize: 24,
        fontFamily: "IRANSansWeb",
    },
    box: {
        flex: 1,
        height: 340,
        margin:5,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation:4,
        shadowOffset: { width: 4, height: 4},
        shadowColor: "grey",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    }
}); //@StyleSheet