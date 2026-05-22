// Importamos o useState do React
// Ele será usado para criar e controlar um estado (memória
interna do componente)
import { useState } from "react"
// Recebemos uma prop chamada adicionarAluno
// Essa função veio do componente pai (App)
function FormAluno({ adicionarAluno }) {
// Criamos um state chamado "nome"
// nome → valor atual
// setNome → função que atualiza o valor
// Começa como string vazia
const [nome, setNome] = useState("")
// Função chamada quando o formulário é enviado
function handleSubmit(e) {
// Impede o comportamento padrão do formulário
// (que seria recarregar a página)
e.preventDefault()
// Se o campo estiver vazio ou só com espaços,
// a função para aqui
if (nome.trim() === "") return
// Chamamos a função que veio via props
// Enviando o nome digitado
adicionarAluno(nome)