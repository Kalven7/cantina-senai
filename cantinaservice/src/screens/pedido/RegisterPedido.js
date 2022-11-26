import { StyleSheet, View, Image, useWindowDimensions,Picker } from "react-native";
import React, { useContext, useState } from 'react';
import api from '../../api'
import Logo from '../../../assets/images/Logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Context } from "../../context/authContext";

const Pedido = ({ navigation }) => {
    const { state, dispatch } = useContext(Context);

    const [idUser, setidUser] = useState(state.idUser);
    const [idProduto, setidProduto] = useState(state.idProduto);
    const [quantidade, setQuantidade] = useState('');
    const [valorTotal, setValorTotal] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/pedido/register", {
                idUser: idUser,
                idProduto: idProduto,
                quantidade: quantidade,
                valorTotal: valorTotal,
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setQuantidade("")
                setValorTotal("")
                dispatch({type: "update", payload: true})
            }
            else {
                console.log(authData.data.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.view}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                
                value={state.nameProduto}
                editable={false}
            />
            <Picker

                selectedValue={''}
                style={styles.picker}
                onValueChange={setQuantidade}
            >
                <Picker.Item label="1" />
                <Picker.Item label="2" />
                <Picker.Item label="3" />
                <Picker.Item label="4" />
                <Picker.Item label="5" />
                <Picker.Item label="6" />
                <Picker.Item label="7" /> 
               
            </Picker>

            <CustomInput
                placeholder="valor total"
                value={valorTotal}
                setValue={setValorTotal}
            />
            
            <CustomButton text="Registrar o pedido" onPress={onRegisterPressed} />

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        backgroundColor:"salmon"
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        width: '100%'
    }
});

export default Pedido;