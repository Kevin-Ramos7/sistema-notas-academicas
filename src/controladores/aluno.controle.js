const db = require('../modelos/db');

// Consultar todos os alunos
exports.consultarAlunos = (req, res) => {
  const sql = 'SELECT * FROM aluno';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao consultar alunos.');
    }
    res.json(result);
  });
};

// Adicionar um novo aluno
exports.adicionarAluno = (req, res) => {
  const { nome, nota1, nota2 } = req.body;

  if (!nome || nota1 === undefined || nota2 === undefined) {
    return res.status(400).send('Todos os campos (nome, nota1, nota2) são obrigatórios.');
  }

  const nota1Convertida = parseFloat(nota1);
  const nota2Convertida = parseFloat(nota2);

  if (isNaN(nota1Convertida) || isNaN(nota2Convertida)) {
    return res.status(400).send('As notas devem ser números válidos.');
  }

  // Verificar se a nota já existe no banco
  const verificarNotasSql = 'SELECT * FROM aluno WHERE nota1 = ? OR nota2 = ?';
  db.query(verificarNotasSql, [nota1Convertida, nota2Convertida], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao verificar notas.');
    }

    // Se houver algum aluno com a mesma nota1 ou nota2, retornar erro
    if (result.length > 0) {
      return res.status(400).send('Essa nota já foi atribuída a outro aluno.');
    }

    // Inserir aluno se não houver duplicação de notas
    const sql = 'INSERT INTO aluno (nome, nota1, nota2) VALUES (?, ?, ?)';
    db.query(sql, [nome, nota1Convertida, nota2Convertida], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao inserir aluno.');
      }
      res.status(201).send('Aluno inserido com sucesso!');
    });
  });
};

// Atualizar um aluno
exports.atualizarAluno = (req, res) => {
  const { nome, nota1, nota2 } = req.body;
  const { id } = req.params;

  if (!nome || nota1 === undefined || nota2 === undefined) {
    return res.status(400).send('Todos os campos (nome, nota1, nota2) são obrigatórios.');
  }

  const nota1Convertida = parseFloat(nota1);
  const nota2Convertida = parseFloat(nota2);

  if (isNaN(nota1Convertida) || isNaN(nota2Convertida)) {
    return res.status(400).send('As notas devem ser números válidos.');
  }

  // Verificar se a nota já existe no banco, mas excluindo o aluno atual (usando id != ?)
  const verificarNotasSql = 'SELECT * FROM aluno WHERE (nota1 = ? OR nota2 = ?) AND id != ?';
  db.query(verificarNotasSql, [nota1Convertida, nota2Convertida, id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao verificar notas.');
    }

    // Se houver algum aluno com a mesma nota1 ou nota2, retornar erro
    if (result.length > 0) {
      return res.status(400).send('Essa nota já foi atribuída a outro aluno.');
    }

    // Calcular a média corretamente
    const media = (nota1Convertida + nota2Convertida) / 2;
    const mediaFormatada = parseFloat(media.toFixed(1));

    // Definir a situação com base na média
    let situacao = '';
    if (mediaFormatada >= 6) situacao = 'Aprovado';
    else if (mediaFormatada >= 4) situacao = 'Recuperação';
    else situacao = 'Reprovado';

    // Atualizar o aluno no banco de dados
    const sql = 'UPDATE aluno SET nome = ?, nota1 = ?, nota2 = ?, media = ?, situacao = ? WHERE id = ?';
    db.query(sql, [nome, nota1Convertida, nota2Convertida, mediaFormatada, situacao, id], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao atualizar aluno.');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Aluno não encontrado.');
      }

      const alunoAtualizado = {
        id,
        nome,
        nota1: nota1Convertida,
        nota2: nota2Convertida,
        media: mediaFormatada,
        situacao
      };

      res.json(alunoAtualizado);
    });
  });
};

// Excluir um aluno
exports.excluirAluno = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM aluno WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao excluir aluno.');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Aluno não encontrado.');
    }
    res.send('Aluno excluído com sucesso!');
  });
};

