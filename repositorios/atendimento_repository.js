const query = require('../infraestrutura/database/queries');

class Atendimento_Repository {

    create(atendimento){
      const sql = 'INSERT INTO Atendimentos SET ? '
      return query(sql, atendimento);
    }

    list(){
      const sql = 'SELECT * FROM Atendimentos';
      return query(sql);
    }

    update(id, valores,){
      const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';
      return query(sql, atendimento)
    }
}

module.exports = new Atendimento_Repository;