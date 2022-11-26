import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/authContext'
import api from '../../api'
import { Entypo } from '@expo/vector-icons'
import CustomButton from '../../components/CustomButton'

const Produtos = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const [produtos, setProdutos] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/produto/find');
            setProdutos(list.data.produtos)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    const seePedido = async (item) => {
        await dispatch({type: 'setProduto', payload: item});
        navigation.navigate('ProdutoPedidos');
    }

    const newPedido = async (item) => {
        await dispatch({type: 'setProduto', payload: item});
        navigation.navigate('RegisterPedido')
    }

    return (
        <View style={styles.view}>
            {state.isAdmin ? (
                <CustomButton text="Novo Produto" onPress={() => navigation.navigate("RegisterProdutos")} />
            ) : (
                <></>
            )}
            <FlatList
                data={produtos}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.text} onPress={() => seePedido(item)}>
                                    <Text style={styles.title}>{item.nome}</Text>
                                    <Text style={styles.item}>{item.sabor}</Text>
                                    <Text style={styles.item}>{item.valor}</Text>
                                    
                            </TouchableOpacity>
                            <Entypo
                                name="squared-plus"
                                size={60}
                                color="green"
                                style={styles.icon}
                                onPress={() => newPedido(item)}
                            />
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

export default Produtos

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        marginBottom: 20
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    text: {
        height: 120,
        width: '80%',
        justifyContent: "center",
    },
    title: {
        fontSize: 30
    },
    item: {
        fontSize: 15
    },
    icon: {
        margin: 0
    }
})