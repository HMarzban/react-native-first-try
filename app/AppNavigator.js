import { createStackNavigator } from 'react-navigation';
import { IndexPage } from './pages/index/index.page';
import { ProductContent } from './pages/produc_content/product.content.page';
import { ProductList } from './pages/product_list/produc.list.page';
import { BasketPage } from './pages/basket/basket.page';

const AppNavigator = createStackNavigator({
  Home: { screen: IndexPage },
  Product: { screen: ProductContent },
  ProductList: { screen: ProductList },
  Basket: { screen: BasketPage },

}, {
  initialRouteName: 'Home',
});

export default AppNavigator;
