const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadFiles');

class Pet_Model {
  create(pet, response) {
    const query = 'INSERT INTO Pets SET ?'

    //Chama o metodo uploadDeArquivo, passando o nome da imagem, nome do pet e novocaminho
    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {

        if(erro){
            response.status(400).json({ erro, "success": "false" });
        } else {
          const novoPet = { nome: pet.nome, imagem: novoCaminho};
          conexao.query(query, novoPet, erro => {
            if(erro){
               response.status(400).json(erro);
            } else {
               response.status(200).json({novoPet, "success": "true"}); 
            }
          });
        }
    });
  }
}

module.exports = new Pet_Model();