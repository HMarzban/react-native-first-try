import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView,FlatList, Image, StyleSheet} from "react-native";

export class Catagory extends Component {
    constructor(){
        super()
    } //@constructor

    scrollListToStart(contentWidth) {
            this.scrollView.scrollTo({x: contentWidth,animated:false});
    } //@Function: scrollListToStart()

    btn_navigate(){
        this.nav.props.navigation.navigate('Product',{
            product: this.item
        });
    } //@Function: btn_navigate()


    render(){
        return(
            <ScrollView 
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={this.scrollListToStart.bind(this)}
                        horizontal={true}
                        alwaysBounceVertical={true}
                        snapToAlignment="end"
                        showsHorizontalScrollIndicator={false}
                    >
            <FlatList 
                data={this.props.data}
                horizontal={true}
                renderItem={({item}) => ( 
                    <TouchableOpacity 
                        activeOpacity={.92} 
                        style={styles.card}
                        onPress={this.btn_navigate.bind(Object.assign({nav:this,item:item}))}
                    >
                        <View style={styles.cardImage}>
                            <Image style={{flex:1,width:null,height:null,resizeMode:"contain"}} source={{uri:item.img}}  />    
                        </View>
                        <View style={styles.cartTitle}>
                            <Text numberOfLines={2} style={styles.cartTitleText}>{item.title}</Text>
                        </View>
                        <View style={styles.cardPrice}>
                            <Text style={styles.cardPriceText}>{item.price} تومان</Text>
                        </View>
                    </TouchableOpacity>
                )}
            >
            </FlatList>
            </ScrollView>
        );
    }
} //@Class: Catagory()


const styles = StyleSheet.create({
    flatList:{
        width:1800,flex:1,
        direction:"rtl",flexDirection:"row-reverse",
        padding:10,
        alignContent:"space-between"
    },
    card:{
        overflow:"hidden",
        borderRadius:4,
        width:160,
        marginLeft:20,
        borderWidth:1,
        borderColor:"#ddd",
        backgroundColor:"#fff",
        elevation:4,
        shadowOffset: { width: 4, height: 4},
        shadowColor: "grey",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        marginBottom:10
    },
    cardImage:{
        flex:3,padding:10
    },
    cartTitle:{
        height:60,flexDirection:'row'
    },
    cartTitleText:{
        flex:1,flexWrap:"wrap",fontFamily: "IRANSansWeb",padding:6,fontSize:12
    },
    cardPrice:{
        flex:1,borderTopWidth:1,borderTopColor:"#ddd"
    },
    cardPriceText:{
        color:"green",fontFamily: "IRANSansWeb",padding:6,fontSize:12
    }
})

export default Catagory;