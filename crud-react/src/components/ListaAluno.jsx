// Esse componente recebe uma prop chamada "alunos"
// Ela é enviada pelo componente pai (App)
function ListaAlunos({ alunos }) {

  return (

    // <ul> é uma lista não ordenada (lista com marcadores)
    <ul>

      {/* 
        Aqui usamos o método map()
        map() percorre cada item do array "alunos"
        e transforma cada item em um elemento JSX
      */}
      {alunos.map((aluno, index) => (

        // Para cada aluno do array, criamos um <li>
        // key é obrigatória no React quando criamos listas
        // index é a posição do item no array
        <li key={index}>
          {aluno.nome} - {aluno.idade} anos
        </li>

      ))}

    </ul>
  )
}

// Exportamos o componente para usar no App.jsx
export default ListaAlunos