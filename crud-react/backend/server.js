const express = require('express');

// Importa o mysql
const mysql = require('mysql2');

const cors = require('cors');

const app = express();

// Permite receber JSON (IMPORTANTE para POST depois)
app.use(express.json());

app.use(cors());

const porta = 3001;

// ================= CONEXÃO COM BANCO =================
const conexao = mysql.createConnection({
    host: 'localhost',       // ou o IP do seu banco
    user: 'root',            // usuário do MySQL
    password: 'Ctrlplay#26',  // senha do MySQL (se houver)
    database: 'escola'        //nome do banco
})

// ================= ROTAS =================

// =========================
// ROTAS GET
// =========================


// Rota inicial (teste)
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

//Rota aluno
app.get('/alunos', (req, res) => {
    const query = 'SELECT ra, nome, idade FROM aluno';
    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro na consulta: ', erro);
            return res.status(500).json({ erro: 'Erro ao buscar alunos' });
        }

        res.json(resultados);
    });
});

// Cursos
app.get('/cursos', (req, res) => {
    const query = 'SELECT id, nome FROM curso';

    conexao.query(query, (erro, resultados) => {
        if (erro) {
          console.error('Erro na consulta: ', erro);
          return res.status(500).json({ erro: 'Erro ao buscar alunos' });
        }
        res.json(resultados); 
    });
});

// Professores
app.get('/professores', (req,res) => {
    const query='SELECT id, nome, formacao FROM professor';

    conexao.query(query, (erro, resultados) => {
      if (erro) {
        console.error('Erro na consulta: ', erro);
        return res.status(500).json({ erro: 'Erro ao buscar alunos' });
      }
      res.json(resultados); 
  });
});


// =========================
// ROTAS POST
// =========================

// POST Aluno
app.post('/alunos', (req, res) => {

    // Agora o RA também vem do frontend
    const { ra, nome, idade, cursoID, telefone, endereco, cpf } = req.body;

    // Query respeitando a estrutura da tabela
    const sql = `
        INSERT INTO aluno 
        (ra, nome, idade, cursoID, telefone, endereco, cpf) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Executa a inserção no banco
    conexao.query(sql, [ra, nome, idade, cursoID, telefone, endereco, cpf], (erro) => {

        // Tratamento de erro
        if (erro) {
            console.error(erro);

            // Caso comum: RA duplicado (PRIMARY KEY)
            return res.status(500).json({ erro: 'Erro ao cadastrar aluno (RA pode já existir)' });
        }

        // Resposta de sucesso
        res.json({ mensagem: 'Aluno cadastrado com sucesso' });
    });
});

//POST Cursos
app.post('/cursos', (req, res) => {

    // Recebe nome e carga horária
    const { nome, cargaH } = req.body;

    const sql = 'INSERT INTO curso (nome, cargaH) VALUES (?, ?)';

    conexao.query(sql, [nome, cargaH], (erro) => {

        if (erro) {
            console.error(erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar curso' });
        }

        res.json({ mensagem: 'Curso cadastrado com sucesso' });
    });
});

//POST Professor 
app.post('/professores', (req, res) => {

    // Recebe todos os dados necessários
    const { nome, formacao, cargaH, h_aula } = req.body;

    const sql = `
        INSERT INTO professor 
        (nome, formacao, cargaH, h_aula) 
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(sql, [nome, formacao, cargaH, h_aula], (erro) => {

        if (erro) {
            console.error(erro);
            return res.status(500).json({ erro: 'Erro ao cadastrar professor' });
        }

        res.json({ mensagem: 'Professor cadastrado com sucesso' });
    });
});

// Liga o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

