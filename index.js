const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');

//Conectando na Base de dados
conexao.connect(erro => {
  if(erro){
     console.log(erro);
  } else {
      console.log('Conectado com sucesso ao Banco de dados!')

      //Passado a conexão para tabelas
      Tabelas.init(conexao);

      //Instanciando
      const app = customExpress();

      //Porta que será usadao para executar a aplicação
      app.listen(3000, () => console.log('Servidor executando na porta 3000'));
  }
});



