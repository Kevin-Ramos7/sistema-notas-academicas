document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("alunoform");
    const listaAlunos = document.getElementById("listaAlunos");

    // Função para carregar alunos
    function carregarAlunos() {
        fetch("http://localhost:3000/alunos")
        .then(res => res.json())
        .then(data => {
            listaAlunos.innerHTML = "";
            data.forEach(aluno => {
                listaAlunos.innerHTML += `
                    <tr>
                        <td>${aluno.id}</td>
                        <td>${aluno.nome}</td>
                        <td>${parseFloat(aluno.nota1).toFixed(1)}</td> <!-- Formatação de nota1 -->
                        <td>${parseFloat(aluno.nota2).toFixed(1)}</td> <!-- Formatação de nota2 -->
                        <td>${parseFloat(aluno.media).toFixed(1)}</td> <!-- Formatação da média -->
                        <td>${aluno.situacao}</td>
                        <td>    
                            <button onclick="removerAluno(${aluno.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.log('Erro ao carregar alunos:', err);
        });
    }

    // Função para adicionar aluno
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const nota1 = parseFloat(document.getElementById("nota1").value); // Garantir que a nota seja um número
        const nota2 = parseFloat(document.getElementById("nota2").value); // Garantir que a nota seja um número

        if (isNaN(nota1) || isNaN(nota2)) {
            alert("As notas devem ser números válidos.");
            return;
        }

        fetch("http://localhost:3000/alunos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, nota1, nota2 })
        })
            .then(() => {
                form.reset();
                carregarAlunos();
            })
            .catch(error => console.error("Erro ao adicionar aluno:", error));
    });

    // Função para excluir aluno
    window.removerAluno = function(id) {
        fetch(`http://localhost:3000/alunos/${id}`, {
            method: "DELETE"
        })
            .then(() => carregarAlunos())
            .catch(error => console.error("Erro ao excluir aluno:", error));
    };

    carregarAlunos(); // Carregar alunos ao inicializar
});
