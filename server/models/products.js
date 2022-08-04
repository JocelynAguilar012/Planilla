const mongoose= require("mongoose");
const Schema = mongoose.Schema;

//aca agregamos los capos que mandaremos a mongo-----------
const UserSchema = Schema({
    title:String,
    price:String,
    category:String,
    description:String,
    iduser:String,
    name:String,
    phone:String,
    avatar: String,
    active:Boolean

});

//aca agregamos los capos que mandaremos a mongo-----------

module.exports=mongoose.model("Products",UserSchema);