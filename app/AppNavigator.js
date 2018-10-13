import { createStackNavigator } from 'react-navigation';
import { Index_page } from "./pages/index/index.page";
import {Product_content} from "./pages/produc_content/product.content.page";
import {Product_list} from "./pages/product_list/produc.list.page";
import {Basket_page} from "./pages/basket/basket.page";

const AppNavigator = createStackNavigator({
  Home: { screen: Index_page },
  Product: { screen: Product_content},
  ProductList: { screen: Product_list},
  Basket : {screen: Basket_page}
  
},{
    initialRouteName: 'Home',
});

export default AppNavigator;
