import express from "express";
import Produto from "../models/Produto.js";

const produto = express.Router();

produto.get('/', (req, res) => {

});

produto.post('/register', async (req, res) => {
    const { nome, sabor, valor } = req.body;

    const alreadyExistsProduto = await Produto.findOne(
        { where: { nome } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsProduto) {
        console.log("Produto existente: " + alreadyExistsProduto);
        return res
            .status(409)
            .json({ message: "Produto já cadastrado" })
    }

    const newProduto = new Produto({ nome, sabor, valor });
    const savedProduto = await newProduto.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Não foi possível cadastrar o produto" });
    });

    if (savedProduto) {
        console.log(savedProduto);
        res.json({ message: "Obrigado pelo cadastro!" })
    }




});
produto.get('/find', async (req, res) => {
    const produtos = await Produto.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (produtos){
        return res.json({produtos})
    } else {
        return null
    }
})

export default produto;