const { response } = require("express");
const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  config = require("./config/config");

const userModel = require("./models/user");
require("./config/mongoose");
const app = express();
//const con_mongodb = require("./config/con_mongodb");

app.set("key", config.key);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth = express.Router();
const bcrypt = require("bcrypt");

//CONTROLLERS
const userController = require("./controllers/userController");
const roleController = require("./controllers/roleController");
const productController = require("./controllers/productController");
//
app.get("/", (req, res) => {
  res.json([{ mensaje: "raiz de la web api" }]);
});

//USERS
app.get("/user/", auth, userController.getAll);
app.get("/user/:id", auth, userController.getOne);
app.post("/user/", auth, userController.createU);
app.put("/user/:id", auth, userController.updateU);
app.delete("/user/:id", auth, userController.deleteU);
app.put("/user/assignRole/:id", auth, userController.assignRole);

//ROLES
app.get("/role/", auth, roleController.getAll);
app.get("/role/:id", auth, roleController.getOne);
app.post("/role/", auth, roleController.createR);
app.put("/role/:id", auth, roleController.updateR);
app.delete("/role/:id", auth, roleController.deleteR);

//PRODUCTS
app.get("/product/", auth, productController.getAll);
app.get("/product/:id", auth, productController.getOne);
app.post("/product/", auth, productController.createP);
app.put("/product/:id", auth, productController.updateP);
app.delete("/product/:id", auth, productController.deleteP);

//REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const emailExist = await userModel.findOne({ email: email });
  if (emailExist) return res.status(400).send("Email already exists.");
  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  //create user
  const registerUser = new userModel({
    name,
    email,
    password: hashPassword,
  });
  try {
    const savedUser = await registerUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(400).send("Email is not found.");
  //password correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");
  //create token
  const payload = { check: true };
  const token = jwt.sign(payload, app.get("key"), { expiresIn: 300 });
  res.json({ _id: user._id, token: token });
});

/*
app.post("/login", async (req, res) => {
  try {
    let user = req.body.usuario;
    let pass = req.body.password;

    const db = await con_mongodb();
    let encontrado = await db.collection("users").findOne({ usuario: user });

    if (encontrado) {
      if (await bcrypt.compare(pass, encontrado.password)) {
        const payload = { check: true };
        const token = jwt.sign(payload, app.get("key"), { expiresIn: 60 });
        res.json({ _id: encontrado._id, token: token });
      } else res.json({ _id: "0", token: "usuario o password incorrectos" });
    } else res.json({ _id: "0", token: "acceso denegado" });
  } catch (error) {
    res.json({ mensaje: error });
  }
});
*/

//TOKEN
auth.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida " + err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
  /*
  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida " + err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }*/
});

app.listen(9000, () => {
  console.log(`Server Started at ${9000}`);
});
