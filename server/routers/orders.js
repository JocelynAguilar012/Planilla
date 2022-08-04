const express =require("express");
const UserController = require("../controllers/orders");
const md_auth = require("../middlewares/authenticated")


const api  = express.Router();
//RUTA DE INSERTAR--------------------------
api.post("/products-ordeerup",UserController.productsUpcaarrto);

api.get("/orders-get",[md_auth.ensureAuth],UserController.getOrders);

api.delete("/deleteorders/:id",[md_auth.ensureAuth],UserController.deleteOrders);

api.put("/updateOrders/:id",[md_auth.ensureAuth],UserController.updateOrders);

module.exports=api;