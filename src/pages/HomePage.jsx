import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import AuthorizationContext from "../contexts/AuthorizationContext"
import { useContext, useEffect } from "react"
import axios from "axios"
import dayjs from "dayjs"
import Transactions from "../components/Transactions"

export default function HomePage() {

  const {token, setToken, name, setName, arrayTransactions, setArrayTransactions} = useContext(AuthorizationContext)
 
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    if (!token){
      navigate("/")
    }
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transactions`,config);
        promise.then(resposta => {
            console.log(resposta.data);
            setArrayTransactions(resposta.data);
        });
        promise.catch( erro => console.log(erro) );
  }, [])

  function logout(){
    
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/sign-out`,config);
    promise.then((res) => {
      console.log(res.data)
      localStorage.removeItem("token")
      setToken(undefined)
      navigate('/')
    });
    promise.catch( erro => { 
      console.log(erro.response)});
  }

  const arraySaidas = arrayTransactions.filter( saida => saida.tipo === "saida")

  const arrayEntradas = arrayTransactions.filter( entrada => entrada.tipo === "entrada")

  const somaSaidas = arraySaidas.reduce( (acumulador,valorAtual,) => acumulador + Number(valorAtual.value), 0);

  const somaEntradas = arrayEntradas.reduce( (acumulador,valorAtual,) => acumulador + Number(valorAtual.value), 0);

  let soma = somaEntradas - somaSaidas

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit data-test="logout" onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>  
          {arrayTransactions.map( (item) => 
            <Transactions
              key={item.id}
              description={item.description}
              value={item.value}
              tipo={item.tipo}
              date={item.date}
            />
          )}
  
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={soma >= 0 ? "positivo" : ""}>{soma}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>

        <Link to="/nova-transacao/entrada" data-test="new-income">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>

        <Link to="/nova-transacao/saida" data-test="new-expense">
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
        
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
