import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  CheckBox,
  Picker,
} from "react-native";
import React, { useContext, useState } from "react";
import Logo from "../../../assets/images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from "../../api";
import { Context } from "../../context/authContext";

const RegisterProdutos = ({ navigation }) => {
  const { dispatch } = useContext(Context);

  const [nome, setNome] = useState("");
  const [sabor, setSabor] = useState("Salgado");
  const [valor, setValor] = useState("");

  const { height } = useWindowDimensions();

  const onRegisterPressed = async () => {
    try {
      const data = await api.post("/produto/register", {
        nome: nome,
        sabor: sabor,
        valor: valor,
      });
      if (data.status === 200) {
        alert(data.data.message);
        setNome("");
        setSabor("");
        setValor("");
        dispatch({ type: "update", payload: true });
      } else {
        console.log(data.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.view}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="Nome do Produto"
        value={nome}
        setValue={setNome}
      />

      <Picker
        selectedValue={sabor}
        style={styles.picker}
        onValueChange={(value) => {
          setSabor(value);
        }}
      >
        <Picker.Item label="Salgado" />
        <Picker.Item label="Doce" />
      </Picker>

      <CustomInput
        placeholder="Valor do produto"
        value={valor}
        setValue={setValor}
      />

      <CustomButton text="Registrar o produto" onPress={onRegisterPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "salmon",
  },
  logo: {
    width: "70%",
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
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    borderWidth: 0,
    height: 45,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default RegisterProdutos;
