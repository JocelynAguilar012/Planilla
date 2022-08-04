const express =require("express");
const UserController = require("../controllers/carrito");
const md_auth = require("../middlewares/authenticated")


const api  = express.Router();
//RUTA DE INSERTAR--------------------------
api.post("/products-carritoup",UserController.productsUpcaarrto);


api.get("/product-carrito",[md_auth.ensureAuth],UserController.getProductsCarrito);

api.delete("/deletecarrito-user/:id",[md_auth.ensureAuth],UserController.deletecarrito);

api.delete("/deleteallcarrito-user/:id",[md_auth.ensureAuth],UserController.deleteAllcarrito);

module.exports=api;