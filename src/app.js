const express = require('express');
const cors = require('cors');
const app = express();
const porta = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://outro-dominio.com']
}));

const db = require('./modelos/db');

app.use(express.json());

// Função para calcular a média e situação
const calcularMediaESituacao = (nota1, nota2) => {
  const media = (nota1 + nota2) / 2;
  let situacao = '';
  if (media >= 6) {
    situacao = 'Aprovado';
  } else if (media >= 4) {
    situacao = 'Recuperação';
  } else {
    situacao = 'Reprovado';
  }
  return { media, situacao };
};

// Rota para consultar alunos
app.get('/alunos', (req, res) => {
  const sql = 'SELECT * FROM aluno';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar alunos.', details: err.message });
    }
    res.json(result);
  });
});

// Rota para adicionar um aluno
app.post('/alunos', (req, res) => {
  const { nome, nota1, nota2 } = req.body;

  if (!nome || nota1 === undefined || nota2 === undefined) {
    return res.status(400).json({ error: 'Todos os campos (nome, nota1, nota2) são obrigatórios.' });
  }

  if (isNaN(nota1) || isNaN(nota2)) {
    return res.status(400).json({ error: 'Notas inválidas. As notas devem ser numéricas.' });
  }

  const { media, situacao } = calcularMediaESituacao(nota1, nota2);

  const sql = 'INSERT INTO aluno (nome, nota1, nota2, media, situacao) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [nome, nota1, nota2, media, situacao], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir aluno.', details: err.message });
    }

    res.status(201).json({ message: 'Aluno inserido com sucesso!' });
  });
});

// Rota para atualizar um aluno
app.put('/alunos/:id', (req, res) => {
  const { nome, nota1, nota2 } = req.body;
  const { id } = req.params;

  if (!nome || nota1 === undefined || nota2 === undefined) {
    return res.status(400).json({ error: 'Todos os campos (nome, nota1, nota2) são obrigatórios.' });
  }

  if (isNaN(nota1) || isNaN(nota2)) {
    return res.status(400).json({ error: 'Notas inválidas. As notas devem ser numéricas.' });
  }

  const { media, situacao } = calcularMediaESituacao(nota1, nota2);

  const sql = 'UPDATE aluno SET nome = ?, nota1 = ?, nota2 = ?, media = ?, situacao = ? WHERE id = ?';

  db.query(sql, [nome, nota1, nota2, media, situacao, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar aluno.', details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    res.json({ message: 'Aluno atualizado com sucesso!' });
  });
});

// Rota para excluir um aluno
app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM aluno WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir aluno.', details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    res.json({ message: 'Aluno excluído com sucesso!' });
  });
});

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack);
  res.status(500).json({ error: 'Algo deu errado no servidor.' });
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
