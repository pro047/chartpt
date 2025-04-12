import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../network/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onHandleEmail = (e) => {
    setEmail(e.target.value);
  };

  const onHandlePassowrd = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Title>로그인</Title>
          <Input
            type='text'
            value={email}
            placeholder='Email'
            onChange={onHandleEmail}
          />
          <Input
            type='password'
            value={password}
            placeholder='Password'
            onChange={onHandlePassowrd}
          />
          <Btn type='submit'>로그인</Btn>
          <Btn>
            <Link to='/signup'>회원가입</Link>
          </Btn>
        </Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 30%;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
`;

const Title = styled.div`
  font: 1.5em ChosunGu;
  height: 2.5em;
`;

const Input = styled.input`
  display: flex;
  padding: 0.7em;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
`;

const Btn = styled.button`
  display: flex;
  padding: 0.7em 5.5em;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
`;

export default Login;
