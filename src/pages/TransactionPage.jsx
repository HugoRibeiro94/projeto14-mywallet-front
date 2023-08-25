import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import AuthorizationContext from "../contexts/AuthorizationContext";
import axios from "axios";

export default function TransactionsPage() {

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const {tipo} = useParams();

  const {token} = useContext(AuthorizationContext)

  const navigate = useNavigate();

  function newTransaction(e){
    e.preventDefault()

    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    const transaction = {
      value:value,
      description:description
    }
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`,transaction,config);
    promise.then((res) => { 
      console.log(res.data)
      navigate('/home');
    });
    promise.catch( erro => {
      alert(erro.response)
    }); 

  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>

      <form onSubmit={newTransaction}>

        <input 
          placeholder="Valor" 
          type="text"
          onChange={ e => setValue(e.target.value)}
          value={value}
          required
        />

        <input 
          placeholder="Descrição" 
          type="text" 
          onChange={ e => setDescription(e.target.value)}
          value={description}
          required
        />

        <button type="submit">Salvar {tipo}</button>

      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
