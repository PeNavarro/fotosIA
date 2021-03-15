import React, {useState} from 'react'
import './App.css'
import {ReactComponent as Robot} from '../src/images/robot.svg'
import Loading from '../src/images/Eclipse-0.9s-201px.gif'

function App(){
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState (facilitador para getter/setter)
  const [pessoas, setPessoas] = useState([]) //[] Inicializa como um array
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')

  function ListaPessoas(props){ //Função iniciando com letra maiúscula pois isso é necessário para que ela seja detectada como componente React
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) => 
      <img key={pessoa.id} 
      src={pessoa.urls[4][512]} 
      title="Pessoa gerada via IA" 
      alt="Pessoa gerada via IA"/>  
    ) //Proceso com .map é similar ao foreach em PHP
    return(
      <>{listagemPessoas}</>
    )
  }

  async function obtemFoto(){
    setCarregando(true)
    let apiKey = process.env.REACT_APP_APIKEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}`: ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}`: ''

    let url= `https://api.generated.photos/api/v1/faces?api_key=${apiKey}${filtraEtnia}${filtraIdade}&order_by=random`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setPessoas(data.faces)
    })
    .catch(function (error){
      console.error("Houve um erro na requisição: "+error.message)
    })
    setCarregando(false)
  }

  return(
    <div className="app">
      <h1>Gerador de fotos com IA</h1>
      {pessoas &&
      <Robot/>
      }
      {carregando &&
        <img src={Loading} title="Aguarde..." alt="Aguarde" width="70"/>
      }
      <div className="row">
        <ListaPessoas pessoas={pessoas}/>
      </div>

      {pessoas &&
      <div className="row">
        <div className="filter">
          <label>Idade:</label>
          <select onChange={event => setIdade(event.target.value)}>
            <option value="">Todas</option>
            <option value="infant">Infantil</option>
            <option value="child">Criança</option>
            <option value="young-adult">Jovem</option>
            <option value="adult">Adulto</option>
            <option value="elderly">Idoso</option>
          </select>
        </div>

        <div className="filter">
          <label>Etnia:</label>
          <select onChange={e => setEtnia(e.target.value)}>
            <option value="">Todas</option>
            <option value="white">Brana</option>
            <option value="latino">Latina</option>
            <option value="asian">Asiátia</option>
            <option value="black">Negra</option>
          </select>
        </div>
      </div>
      }

      <div className="row">
        <button type="button" onClick={obtemFoto}>
          Obter Imagens
        </button>
        {pessoas.length > 0 &&
        <button type="button" onClick={() => setPessoas([])}>
          Limpar Imagens
        </button>
        }
      </div>
    </div>
  )
}

export default App