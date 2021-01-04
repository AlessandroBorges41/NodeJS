const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: '127.0.0.1',
  port : 3306,
  user: 'petshop',
  password: 'PetShop@2020',
  database: 'agenda-petshop',
});


/* conexao.connect((error)=>{
    if(error){
      console.log('Erro ao tentar conectar o database...', error);
    }
    console.log('Conexão estabelecida com banco!');
});

conexao.connect((error)=>{
  if(error){
    console.log('Erro ao finalizar a conexão com database...', error);
  }
    console.log('Conexão finalizada com sucesso!');
}); */

module.exports = conexao;