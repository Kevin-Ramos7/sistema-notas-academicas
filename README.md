# 📚 Sistema de Notas Acadêmicas

Este projeto é um sistema de gerenciamento de notas acadêmicas, desenvolvido com Node.js e MySQL. Ele permite cadastrar, atualizar, consultar e excluir alunos, além de armazenar suas respectivas notas.

Também foi criada uma **interface básica em HTML** para testar as funcionalidades da API de forma visual.

---

## 🚀 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Kevin-Ramos7/sistema-notas-academicas.git
cd sistema-notas-academicas

npm install

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

npm start

Endpoints disponíveis
GET /alunos – Consulta todos os alunos

POST /alunos – Adiciona um novo aluno

PUT /alunos/:id – Atualiza os dados de um aluno

DELETE /alunos/:id – Exclui um aluno

O projeto inclui um arquivo index.html simples, localizado na raiz ou pasta pública, que pode ser aberto diretamente no navegador
para testar os endpoints da API.


Tecnologias utilizadas

Node.js
Express
MySQL
dotenv
CORS
HTML (interface básica)

Feito por Keven Ramos










