const mongoose= require("mongoose");
const Schema = mongoose.Schema;

//aca agregamos los capos que mandaremos a mongo-----------
const UserSchema = Schema({
    description:String,
    priceoforders:String,
    iduser:String
});

//aca agregamos los capos que mandaremos a mongo-----------

module.exports=mongoose.model("Orders",UserSchema);