const Atendimentos_Models = require('../models/atendimentos_model');

module.exports = app =>{
  app.get('/atendimentos', (request, response) => {
  
       Atendimentos_Models.list()
       .then(resultados => response.status(200).json(reultados))
       .catch(erros => response.status(400).json(erros));

  });

  app.get('/atendimentos/:id', (request, response) => {
    const id = parseInt(request.params.id);

    Atendimentos_Models.listId(id, response);

  });


  app.post('/atendimentos', (request, response) => {
    //Obtem os dados enviados no body
    const atendimento = request.body;

    Atendimentos_Models.create(atendimento)
     .then(atendimentoCadastrado => 
           response.status(201).json(atendimentoCadastrado)
     )
     .catch( erros => response.status(400).json(erros));
  });
  
  app.patch('/atendimentos/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const valores = request.body;

    Atendimentos_Models.update(id, valores)
      .then();
    





  }); 

  app.delete('/atendimentos/:id', (request, response) => {
    const id = parseInt(request.params.id);

    Atendimentos_Models.delete(id, response);
    

  });


}


