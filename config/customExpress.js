const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    //app.use(bodyParser.urlencoded({extended: true}));
    //app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded());
    


    //Uso de consign possibilita agrupar as rotas
    //No caso abaixo estamos pegando todos os aquivos
    //de controllers e incluindo na app
    consign()
        .include('controllers')
        .into(app)

    return app;    
}    