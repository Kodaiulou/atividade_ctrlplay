// Importamos o useState para criar um estado (memória do componente)
import { useState, useEffect } from "react"

// Importamos os dois componentes que criamos
// Eles estão dentro da pasta components
import FormAluno from "./components/FormAluno"
import ListaAlunos from "./components/ListaAlunos"

function App() {

  // Criamos um state chamado "alunos"
  // Começa como um array vazio []
  // alunos → valor atual
  // setAlunos → função que atualiza o valor
  const [alunos, setAlunos] = useState([])

  // Buscar alunos do backend
  useEffect(() => {
    fetch("http://localhost:3001/alunos")
      .then(res => res.json())
      .then(dados => setAlunos(dados))
  }, [])

  // Função responsável por adicionar um novo aluno
  function adicionarAluno(dados) {

    fetch("http://localhost:3001/alunos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
      })
      .then(() => {
        // Atualiza lista depois de cadastrar
        return fetch("http://localhost:3001/alunos")
      })
      .then(res => res.json())
      .then(dados => setAlunos(dados))
    }


  return (
    <div>

      {/* Título da aplicação */}
      <h1>Cadastro de Alunos</h1>

      {/* 
        Enviamos a função adicionarAluno para o FormAluno
        Isso é uma prop
        O componente filho poderá chamar essa função
      */}
      <FormAluno adicionarAluno={adicionarAluno} />

      {/*
        Enviamos o array de alunos para o componente ListaAlunos
        Ele vai usar map() para mostrar na tela
      */}
      <ListaAlunos alunos={alunos} />

    </div>
  )
}

// Exportamos o componente principal da aplicação
export default App