import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";
import AuthorizationContext from "../contexts/AuthorizationContext";

export default function SignUpPage() {

  const [email, setEmail] = useState("");
  const {name, setName} = useContext(AuthorizationContext);
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(null);

  const navigate = useNavigate();

  function createUser(e){
    e.preventDefault();

    const newRegister = {
      email: email,
      name: name,
      password: password
    }

    console.log(newRegister)
  const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`,newRegister);
  promise.then((res) => {
      console.log(res.data)
      //setRegister(res.data);
      navigate('/')
  });
  promise.catch( erro => { 
      alert(erro.response)});

  }

  return (
    <SingUpContainer>
      <form onSubmit={createUser}>
        <MyWalletLogo />
        <input 
          data-test="name"
          placeholder="Nome" 
          type="text"
          onChange={ e => setName(e.target.value)}
          value={name}
          required
        />

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

        <input 
          data-test="conf-password"
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password" 
          onChange={ e => setPassword(e.target.value)}                
          value={password}
          required
        />

        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
