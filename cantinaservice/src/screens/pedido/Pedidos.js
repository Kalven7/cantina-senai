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
import addMaskMoney from "../../utils/addMaskMoney";

const Pedidos = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);

  const [pedidos, setPedidos] = useState({});

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get("/pedidos/findByUser", {
        params: {
          idUser: state.idUser,
        },
      });
      setPedidos(list.data.pedidos);
      dispatch({ type: "update", payload: false });
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
                <View style={styles.infoProduct}>
                  <Text style={styles.item}>{item.produto.nome}</Text>
                  <Text style={styles.userName}>{state.name}</Text>
                </View>

                <Text style={styles.title}>{item.produto.sabor}</Text>

                <View style={styles.info}>
                  <Text style={styles.quantity}>
                    Quantidade: {item.quantidade}
                  </Text>
                  <Text style={styles.unityPrice}>
                    Preço unitário:{" "}
                    {addMaskMoney(item.valorTotal / item.quantidade)}
                  </Text>
                  <Text style={styles.totalPrice}>
                    Preço total: {addMaskMoney(item.valorTotal)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Pedidos;

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
    fontSize: 20,
    margin: 5,
    textAlign: "center",
  },
  userName: {
    textTransform: "capitalize",
  },
  infoProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    textAlign: "left",
  },
  totalPrice: {
    fontSize: 16,
    textAlign: "right",
  },
  unityPrice: {
    fontSize: 16,
    marginLeft: 40,
    textAlign: "right",
  },
  item: {
    margin: 5,
    textTransform: "capitalize",
    fontSize: 16,
  },
  icon: {
    margin: 10,
  },
  myStarStyle: {
    color: "orange",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    width: 50,
    fontSize: 50,
  },
  myEmptyStarStyle: {
    color: "gray",
    width: 50,
    fontSize: 50,
  },
});
