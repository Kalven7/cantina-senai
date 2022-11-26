import { StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { Context } from '../context/authContext'
import Home from './Home'
import Users from './Users'
import PedidosRoutes from './pedido/PedidosRoutes'
import ProdutosRoutes from './produto/ProdutosRoutes'


const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    return (
        <Tab.Navigator screenOptions={{
            headerRight: () => (
                <Entypo
                    name='log-out'
                    size={20}
                    style={{ margin: 10 }}
                    onPress={() => dispatch({ type: 'logOut' })}
                    color="#000"
                />
            )
        }} >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='home' size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pedidos"
                component={PedidosRoutes}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='drink' size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Produtos"
                component={ProdutosRoutes}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='new-message' size={30} />
                    )
                }}
            />

            {state.isAdmin ? (
                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{
                        tabBarIcon: () => (
                            <Entypo name='users' size={30} />
                        )
                    }}
                />
            ) : (
                <></>
            )
            }

        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({})