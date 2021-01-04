const Pet_Model = require('../models/pets_model');

module.exports = app => {
  app.post('/pet', (request, response) => {
      //Obtendo todo conteúdo do body
      const pet = request.body;

      //Chamando o método na pet model e passando os parametros
      Pet_Model.create(pet, response);

  });
}