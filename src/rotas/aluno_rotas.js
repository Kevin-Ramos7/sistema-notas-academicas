
  const express = require('express');
  const rota = express.Router();
  const alunoControlador = require('../controladores/aluno.controle');

 // Rota para consultar alunos
  rota.get('/', alunoControlador.consultarAlunos);

// Rota para adicionar aluno
 rota.post('/', alunoControlador.adicionarAluno);

// Rota para atualizar aluno
 rota.put('/:id', alunoControlador.atualizarAluno);

// Rota para excluir aluno 
 rota.delete('/:id', alunoControlador.excluirAluno);