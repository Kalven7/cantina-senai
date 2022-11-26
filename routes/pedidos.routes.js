import express from "express";
import Pedidos from '../models/Pedido.js';
import User from "../models/User.js";
import Produto from "../models/Produto.js";

const pedidos = express.Router();

pedidos.get('/', (req, res) => {
    res.send('Rota de Produto');
});

pedidos.post("/register", async (req, res) => {

    const { idUser, idProduto, Pedidos,ValorTotal } = req.body;

   

    const newPedidos = new Pedidos({ idUser, idProduto, pedidos });
    const savedPedidos = await newPedidos.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Desculpe, seu pedido não pode ser registrado!" });
    });

    if (savedPedidos) res.json({ message: "Novo pedido registrado!" });
});

pedidos.get('/findByProduto', async (req, res) => {
    const idProduto = req.query.idProduto;
    const pedidos = await Pedidos.findAll({
        where: {
            idProduto: idProduto
        },
        include: [{ model: User }]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (pedidos) {
        return res.json({ pedidos })
    } else {
        return null
    }
})

pedidos.get('/findByUser', async (req, res) => {
    const idUser = req.query.idUser;
    const pedidos = await Pedidos.findAll({
        where: {
            idUser: idUser
        },
        include: [{ model: Produto }]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (pedidos) {
        return res.json({ pedidos })
    } else {
        return null
    }
})

export default pedidos;