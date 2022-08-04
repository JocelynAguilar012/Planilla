const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;

//exportamos la variables de config.js
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

//soluciona erro de actializar 
//mongoose.set("useFindAndModify",false);

//mongoose.connect(`mongodb+srv://22184347:22184347@ecommerce.npg0mwg.mongodb.net/?retryWrites=true&w=majority`
//haciendo la conexion a la base de datos

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/edwin_ecommerce`
    , { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) {
            throw err;
        }
        else {
            console.log("la conexion a la base fue correcta");
            app.listen(port, () => {
                console.log("################ API  ################");
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`)

            })
        }
    });
