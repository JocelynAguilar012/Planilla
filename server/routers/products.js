const express =require("express");
const UserController = require("../controllers/products");
const multipart = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated")
const md_upload_avatar = multipart({uploadDir: "./uploads/products"});


const api  = express.Router();
//RUTA DE INSERTAR--------------------------
api.post("/products-up",UserController.productsUp);

api.get("/product",[md_auth.ensureAuth],UserController.getproducts);

api.put("/uploadproduct-avatar/:id",[md_auth.ensureAuth,md_upload_avatar],UserController.uploadAvatarProducts);

api.get("/getproduct-avatar/:avatarName",UserController.getAvatarProduct);

api.put("/activateProduct-user/:id",[md_auth.ensureAuth],UserController.activateProduct);

api.get("/product-active",[md_auth.ensureAuth],UserController.getProductsActive);

api.delete("/deleteProduct-user/:id",[md_auth.ensureAuth],UserController.deleteProduct);

api.put("/updateProduct-user/:id",[md_auth.ensureAuth],UserController.updateProduct);

api.get("/product-category",[md_auth.ensureAuth],UserController.getProductsCategory);

module.exports=api;