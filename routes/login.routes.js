import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = express.Router();

login.post('/', async (req, res) => {
    // Receber as informações de LOGIN
    const { email, password } = req.body;

    // Buscar EMAIL no Banco de Dados e armazenar
    const registeredUser = await User.findOne(
        { where: { email }}
    ).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!registeredUser)
        return res
            .status(400)
            .json({message: "Email ou Senha inválidos."})

    // Validar a SENHA do Usuário
    if (!bcrypt.compareSync(password, registeredUser.password) )
        return res
            .status(400)
            .json({message: "Email ou Senha inválidos."})
    
    // Geração do TOKEN
    const token = jwt.sign(
        // PAYLOAD: o que será armazenado no TOKEN
        {
            id: registeredUser.id,
            name: registeredUser.name,
            admin: registeredUser.admin
        }, 
        // Secret or Private Key
        process.env.JWT_SECRET,
        // Options
        {
            expiresIn: '30m'
        }
    );

    // Envia confirmação e Token para Usuário
    res.json({
        message: "Bem-vindo!",
        token: token
    })


});

export default login;