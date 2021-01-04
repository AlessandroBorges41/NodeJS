const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento_repository');

class Atendimentos_Models{

   constructor(){

      //Validando data para não ser incluida uma data antes da data de criação
      this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);

      //Validando Nome de cliente sendo maior que 5
      this.clienteEhValido = (tamanho) => tamanho >= 5;

      this.valida = parametros => 
           this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro) 
      })       

   

      this.validacoes = [
        {
          nome: 'data',
          valido: this.dataEhValida,
          mensagem: 'Data deve ser maior ou igual a data atual',
        },
        {
          nome: 'cliente',
          valido: this.clienteEhValido,
          mensagem: 'Nome inválido deve possuir cinco ou mais caracteres',
        }
      ]


   }

   create(atendimento){

      //Usando biblioteca moment para formatar a data no caso abaixo 
      //passando vazio funciona como um New Date()
      const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
     
      //Formatando a data usando Moment
      const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

     const parametros = {
       data: { data, dataCriacao },
       cliente: { tamanho: atendimento.cliente.length }
     }

      const erros = this.valida(parametros); 
      const existemErros = erros.length;

      if(existemErros){
         return new Promise((resolve, reject) => reject(erros));
      } else {
             
             //Para evitar sideeffect 
             const atendimentoDatado = {...atendimento, dataCriacao, data};

             //Usando o Repositório 
             return repositorio.create(atendimentoDatado)
               .then((resultados) => {
                const id = resultados.insertId;
                return ({ ...atendimento, id });
             });
      }
   };

   update(id, valores){

    //const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';
    
    //Verificar se existe o campo
    if(valores.data){
      const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const parametros = {
      data: { data, dataCriacao }
    }

    conexao.query(sql, [valores, id], (erro, resultados) => {
     

      if(erro){
         response.status(400).json(erro);
      } else {
        //Devolve ao client a resposta com os valores e o id que teve a alteração
        response.status(200).json({...valores, id});
      }
    });
  };

  list(){
      return repositorio.list();
  };

  listId(id, response){
      const sql = `SELECT * FROM Atendimentos where id = ${id}`;

      conexao.query(sql, async (erro, resultados) => {
      const atendimento = resultados[0];
      const cpf = atendimento.cpf;  

      if(erro){
         response.status(400).json(erro);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`); 

        atendimento.cliente = data;

        response.status(200).json(atendimento);
      }
    })
  };

  

  delete(id, response){

     const sql = 'DELETE FROM Atendimentos WHERE id = ?';

     conexao.query(sql, id, (erro, resultados) => {

      if(erro){
         response.status(400).json(erro);
      } else {
        //Devolve ao client o id que foi deletado
        response.status(200).json({id, "success": "true"});
      }
    });

  };
}

module.exports = new Atendimentos_Models;