import express from "express";
import Cantina from '../models/Cantina.js'

const cantina = express.Router();

cantina.get('/', (req, res) => {
res.send('Rota da cantina');
});

cantina.post("/register", async (req, res) => {

const { name, valor, menu } = req.body;

const alreadyExistsCantina = await Cantina.findOne({ where: { name } }).catch(
(err) => {
console.log("Error: ", err);
}
);

if (alreadyExistsCantina) {
return res.status(409).json({ message: "Cantina already registered!" });
}

const newCantina = new Cantina({ name, valor, menu });
const savedCantina = await newCantina.save().catch((err) => {
console.log("Error: ", err);
res.status(500).json({ error: "Desculpe, não foi possível registrar seu pedido!" });
});

if (savedCantina) res.json({ message: "Novo pedido realizado!" });
});

cantina.get('/find', async (req, res) => {
const pedidos = await Cantina.findAll().catch(
(err) => {
console.log(err)
}
);

if (pedidos){
return res.json({pedidos})
} else {
return null
}
})

export default cantina;