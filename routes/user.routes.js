import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import verifyToken from "../config/auth.js";

const user = express.Router();

user.get("/", (req, res) => {
  const token = req.headers["token"];
  const authData = verifyToken(token, res);
});

user.post("/register", async (req, res) => {
  const { name, email, password, admin } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => console.log("Error: ", err)
  );

  if (alreadyExistsUser) {
    console.log("Usuário existente: " + alreadyExistsUser);
    return res
      .status(409)
      .json({ message: "E-mail já utilizado por outro usuário" });
  }

  const newUser = new User({ name, email, password, admin });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
  });

  if (savedUser) {
    console.log(savedUser);
    res.json({ message: "Obrigado pelo cadastro!" });
  }
});

user.put("/update", async (req, res) => {
  const { name, email, oldEmail, oldPassword, password, admin } = req.body;

  const updateUser = await User.findOne({ where: { email: oldEmail } }).catch(
    (err) => console.log("Error: ", err)
  );

  // Validar a SENHA do Usuário
  if (!bcrypt.compareSync(oldPassword, updateUser.password)) {
    return res.status(400).json({ error: "Senha inválida." });
  }

  updateUser.name = name;
  updateUser.email = email;
  updateUser.password = password;
  updateUser.admin = admin;

  const savedUser = await updateUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
  });

  if (savedUser) {
    console.log(savedUser);
    res.json({ message: "Obrigado pelo cadastro!" });
  }
});

export default user;
