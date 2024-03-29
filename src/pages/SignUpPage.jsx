import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import axios from "axios";

export default function SignUpPage() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  function createUser(e){
    e.preventDefault();

    if(newPassword !== password){
      return alert ("senha não confirmada")
    }
    const newRegister = {
      email: email,
      name: name,
      password: password
    }

    console.log(newRegister)
  const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`,newRegister);
  promise.then((res) => {
    console.log(res.data)
    navigate('/')
  });
  promise.catch( erro => { 
    console.log(erro.response);});
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
          onChange={ e => setNewPassword(e.target.value)}                
          value={newPassword}
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
