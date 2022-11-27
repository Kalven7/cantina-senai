import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/authContext";
import api from "../../api";

const PedidosProduto = ({ navigation }) => {
  const { state } = useContext(Context);

  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api
        .get("/pedidos/findByProduto", {
          params: {
            idProduto: state.idProduto,
          },
        })
        .then((res) => setPedidos(res.data.pedidos));
    };
    onScreenLoad();
  }, [state.update]);

  return (
    <View style={styles.view}>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.text}>
                <Text style={styles.title}>{item.sabor}</Text>
                <Text style={styles.item}>Avaliado por: {item.user.name}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PedidosProduto;

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
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  text: {
    height: 120,
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    margin: 10,
    textAlign: "center",
  },
  item: {
    margin: 10,
    fontSize: 15,
  },
  icon: {
    margin: 10,
  },
});
