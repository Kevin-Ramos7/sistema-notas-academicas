# 📚 Sistema de Notas Acadêmicas

Este projeto é um sistema de gerenciamento de notas acadêmicas, desenvolvido com Node.js e MySQL. Ele permite cadastrar, atualizar, consultar e excluir alunos, além de armazenar suas respectivas notas.

Também foi criada uma **interface básica com HTML, CSS e JavaScript** para testar as funcionalidades da API de forma visual.

---

## 🚀 Como rodar localmente

```bash
git clone https://github.com/Kevin-Ramos7/sistema-notas-academicas.git
cd sistema-notas-academicas

npm install

---

Crie um arquivo .env com as variáveis:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

---

Depois, inicie o servidor:

npm start

📌 Endpoints disponíveis

GET /alunos – Consulta todos os alunos
POST /alunos – Adiciona um novo aluno
PUT /alunos/:id – Atualiza os dados de um aluno
DELETE /alunos/:id – Exclui um aluno

---

🧪 Interface de Teste

O projeto inclui um arquivo index.html com CSS e JavaScript, localizado na raiz ou pasta pública, que pode ser aberto diretamente no navegador para testar os endpoints da API de forma simples e visual.
Caso prefira, os testes também podem ser feitos utilizando ferramentas como Postman ou Insomnia.

---

🛠️ Tecnologias utilizadas

Node.js
Express
MySQL
dotenv
CORS
HTML, CSS e JavaScript (interface básica)





