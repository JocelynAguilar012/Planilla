const mongoose= require("mongoose");
const Schema = mongoose.Schema;

//aca agregamos los capos que mandaremos a mongo-----------
const UserSchema = Schema({
    title:String,
    price:String,
    category:String,
    iduser:String,
    name:String

});

//aca agregamos los capos que mandaremos a mongo-----------

module.exports=mongoose.model("Carrito",UserSchema);