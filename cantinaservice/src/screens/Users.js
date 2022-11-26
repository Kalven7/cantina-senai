import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/authContext'
import api from '../api'
import { Entypo } from "@expo/vector-icons";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';


const Users = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)

    const AlterarUser = async () => {
        try {
            const data = await api.post('/user/register', {
                
                email: email,
                password: password,
            });
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
                navigation.navigate('home')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/produto/findByUser', {
                params: {
                    idUser: state.idUser,
                  }
            });
            console.log(list);
            setReviews(list.data.reviews)
            dispatch({type: "update", payload: false})
        }
        onScreenLoad();
    }, [state.update]
    )

    return (
        <View style={styles.view}>
        
            <Text style={styles.text}>
                Deseja alterar seus dados de login ?
            </Text>

            <CustomInput placeholder="Email" />
            <CustomInput placeholder="Senha " />
            <CustomButton text="Alterar" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
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
        fontSize:20,
        height: 120,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        margin: 5,
        textAlign: 'center'
    },
    item: {
        margin: 5,
        fontSize: 15
    },
    icon: {
        margin: 10
    },
    myStarStyle: {
        color: 'orange',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        width: 50,
        fontSize: 50
    },
    myEmptyStarStyle: {
        color: 'gray',
        width: 50,
        fontSize: 50
    }
})