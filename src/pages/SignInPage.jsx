import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import AuthorizationContext from "../contexts/AuthorizationContext";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {name, setName} = useContext(AuthorizationContext);
  const {setToken} = useContext(AuthorizationContext);

  const navigate = useNavigate();

  function toDoLogin(e){

    e.preventDefault();

    const login = {
      email: email,
      password: password
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`,login);
    promise.then((res) => { 
      console.log(res.data)
      setName(res.data.name)
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token)
      navigate('/home');
    });
    promise.catch( erro => {
      alert(erro.response)
    }); 
  }

  return (
    <SingInContainer>
      <form onSubmit={toDoLogin}>
        <MyWalletLogo />
        <input 
          data-test="email"
          placeholder="E-mail" 
          type="email"
          onChange={ e => setEmail(e.target.value)}
          value={email}
          required
        />

        <input 
          data-test="password"
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password" 
          onChange={ e => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
