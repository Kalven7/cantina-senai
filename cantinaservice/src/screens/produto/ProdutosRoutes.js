import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterProdutos from './RegisterProdutos';
import PedidosProduto from '../pedido/PedidosProduto'
import RegisterPedido from '../pedido/RegisterPedido';
import Produtos from './Produtos';

const Stack = createNativeStackNavigator();

const ProdutosRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainProdutos" component={Produtos} />
                <Stack.Screen name="RegisterProdutos" component={RegisterProdutos} />
                <Stack.Screen name="RegisterPedido" component={RegisterPedido} />
                <Stack.Screen name="PedidosProduto" component={PedidosProduto} />
            </Stack.Navigator>
    )
}

export default ProdutosRoutes
