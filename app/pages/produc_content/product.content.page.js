import React, {Component} from "react";
import {View, Text, StyleSheet, Button,ScrollView, Image, AsyncStorage} from "react-native";

import {pubsub} from "../../services/pubsub";
import {DGKLogo} from "../../components/DGKLogo";

import {BasketButton} from "../../components/basket";
import {Buttonic} from "../../components/Buttonic";


export class Product_content extends Component{

    constructor(){
        super();
        this.state = {
            product: null
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
    
   async buyProduct(){
  
        try {
            let data = []
            let value = JSON.parse( await AsyncStorage.getItem('BasketHolder') );
           //console.log("localstorage",value);
            if (value !== null ) {

                let indexx = -1;
                
                value.forEach((product,index) => {
                    if(product.dkp == this.state.product.dkp){
                        indexx = index;
                    }
                });

                if(indexx != -1){
                    value[indexx]["amount"] = 1 + value[indexx]["amount"];
                }else{
                    this.state.product["amount"] = 1;
                    value.push(this.state.product)
                }
                
                await AsyncStorage.setItem('BasketHolder', JSON.stringify(value));
            }else{
                this.state.product["amount"] = 1;
                data.push(this.state.product);
                await AsyncStorage.setItem('BasketHolder', JSON.stringify(data));
            }
            
            pubsub.emit('basket',true);
            this.props.navigation.navigate('Basket');
            //console.log("your basket updatae",value)
        } catch (error) {
            // Error saving data
            console.log("errr",error)
        }
    } //@Function: buyProduct()

    render(){
        const { navigation } = this.props;
        const product = navigation.getParam('product', {});
        const catID = navigation.getParam('catID', {});
        //console.log("product", product)
        this.state.product = product
        return(
            <View style={styles.container}>
                <View>
                </View>
                <ScrollView style={styles.body}>
                    <View style={[styles.section, styles.productCard]}>
                            <View style={styles.holder}>
                                <Image  source={{uri: product.img}} style={{flex:0.42,width:"100%",resizeMode:"contain",height:"auto"}} /> 
                                <Text   style={styles.productTitle}>{product.title}</Text>   
                            </View>
                        <Text style={styles.productPrice}>{product.price} تومان</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.h2}>نقد و بررسی</Text>
                        <Text style={styles.p}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Text>
                        <Text style={styles.p}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Text>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Buttonic 
                        Title="افزودن به سبد خرید"
                        onPress={this.buyProduct.bind(this)}
                        style={styles.btnBuy}
                        btnStyle = {styles.btnBuy}
                        btnTitleStyle = {styles.btnText}
                    />
                </View>
            </View>
        );
    } //@Function: render()
} //@Class: Product_content()

export default  Product_content;

const styles = StyleSheet.create({
    btnText:{
        fontSize:20,
        color:"#fff",
        fontFamily: "IRANSansWeb",
    },
    btnBuy:{
        flex:1,
        padding:6,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#00bfd6",
        borderRadius:10,
        height:50,
    },
    productPrice:{
        fontSize:18,
        color:"#5f8336",
        marginBottom:4,
        marginTop:10,
        paddingTop:6,
        borderColor:"#eee",
        borderTopWidth:2,
        fontFamily: "IRANSansWeb",
    },
    holder:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        minHeight:134
    },
    productTitle:{
        fontSize:14,
        flex:0.6,
        marginTop:16,
        padding:10,
        fontFamily: "IRANSansWeb",
        
    },
    productCard:{
        //flexDirection: 'row',
       // justifyContent: 'space-between',
        //flexWrap:"wrap" 
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
    p:{
        fontSize:16,
        padding:4,
        textAlign:"right",
        direction:"rtl",
        fontFamily: "IRANSansWeb",
    },
    h2:{
        flex:1,
        fontSize:20,
        fontWeight:"bold",
        fontFamily: "IRANSansWeb",
    },
    body:{
        padding:10,
        marginBottom:36
    },
    section:{
        backgroundColor:"#fff",
        padding:12,
        borderRadius:4,
        marginBottom:10,
        elevation:4,
        shadowOffset: { width: 3, height: 3},
        shadowColor: "grey",
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    footer:{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      backgroundColor:"transparent",
      padding:10,
      backgroundColor:"#fff"
     
    },
    container: {
      flex: 1,
      flexDirection: 'column', 
      justifyContent: 'space-between'
    },
});
  