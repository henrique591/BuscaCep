import {useState} from 'react';
import { FiSearch  } from 'react-icons/fi';
import './styles.css';

import api from './services/api';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});


  async function heandleSearch(){
  
    if(input === ''){
      alert("Preencha algum cep!");
      setInput("");
      
    }
    
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      console.log(response);

    }catch{
      alert("Ops erro ao buscar")
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP </h1>
      

      <div className="containerInput">
        <input type="text"
        placeholder="Digite seu Cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={heandleSearch}>
         <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

   { Object.keys(cep).length > 0 && (
    
        <main>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>DD do Local: {cep.ddd}</span>
        <span>IBGE da Cidade - {cep.uf} - {cep.localidade}: {cep.ibge}</span>
        </main>
   )}

    </div>
  );
}

export default App;
