import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { pubsub } from "../../services/pubsub";
import { BasketButton } from "../../components/basket";


export class Index_page extends Component{

    constructor(){
        super();

        this.state = {
            likeBtn:0
        }

        pubsub.on("like",(_data)=>{
            //console.log("lile Buttom", _data)
            this.setState({
                likeBtn:this.state.likeBtn + _data.count 
            });
        });

    } //@constructor()

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "digikal",
          headerRight: (
            <BasketButton nav={navigation}/>
          ),
        };
    } //@Static: navigationOptions

    fetchData(){
        return [
            [
                {
                    title:"لب تاپ",
                    catID:"labtop",
                    img:"https://dkstatics-public.digikala.com/digikala-categories/391.jpg?x-oss-process=image/resize,m_fill,h_516,w_180/quality,q_90"
                },
                {
                    title:"کنسول بازی",
                    catID:"consoleGame",
                    img:"https://dkstatics-public.digikala.com/digikala-categories/454.jpg?x-oss-process=image/resize,m_fill,h_516,w_180/quality,q_90"
                }
            ],
            [
                {
                    title:"تلوزیون",
                    catID:"tv",
                    img:"https://dkstatics-public.digikala.com/digikala-categories/417.jpg?x-oss-process=image/resize,m_fill,h_516,w_180/quality,q_90"
                },
                {
                    title:"تبلت",
                    catID:"tablet",
                    img:"https://dkstatics-public.digikala.com/digikala-categories/390.jpg?x-oss-process=image/resize,m_fill,h_516,w_180/quality,q_90"
                }
            ],
            [
                {
                    title:"هدفون",
                    catID:"headphon",
                    img:"https://dkstatics-public.digikala.com/digikala-categories/395.jpg?x-oss-process=image/resize,m_fill,h_516,w_180/quality,q_90"
                },
                {
                    title:"",
                    catID:""
                }
            ],
        ]
    } //@Function: fetchData()

    btn_navigate(){
        this.nav.props.navigation.navigate('ProductList',{
            catID: this.item.catID
        });
    } //@Function: btn_navigate()

    render(){
        return(
            <View style={{direction:"rtl"}}>
                 <ScrollView>
                    <FlatList
                        data={this.fetchData()}
                        renderItem={({item}) => ( 
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.box, styles.box2]} onPress={this.btn_navigate.bind(Object.assign({nav:this,item:item[0]}))}>
                                <ImageBackground style={styles.imgBack} source={{uri:item[0].img}} style={{width: '100%', height: '100%'}}>
                                    <Text style={styles.text}>{item[0].title}</Text>
                                </ImageBackground>
                            </TouchableOpacity> 
                            {item[1].title ? <TouchableOpacity style={[styles.box, styles.box2]} onPress={this.btn_navigate.bind(Object.assign({nav:this,item:item[1]}))}>
                                <ImageBackground style={styles.imgBack} source={{uri:item[1].img}}  style={{width: '100%', height: '100%'}}>
                                    <Text style={styles.text}>{item[1].title}</Text>
                                </ImageBackground>
                            </TouchableOpacity>  : <Text></Text> }
                        </View>)}
                    />
                    </ScrollView>
            </View>
        );
    } //@Function: render()

} //@Class: Index_page()

export default  Index_page;

const styles = StyleSheet.create({
    imgBack:{
        borderRadius:3,
       flex:1,
       flexDirection: 'row',
       justifyContent:"flex-end",

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
      },
      text:{
        fontSize: 24,
        flex:1,
        color:"#fff",
        position:"absolute",
        bottom:0,
        padding:2,
        paddingRight:20,
        paddingLeft:20,
        borderRadius:3,
        backgroundColor:"#00000066",
        fontFamily: "IRANSansWeb",
        //fontFamily: "Tahoma"
      },
      box: {
        height: 180,
        margin:4,
        flex:1,
        borderWidth:6,
        borderColor:"#fff",
        borderRadius:2
      }
}); //@StyleSheet