import React, {useRef, useCallback, useContext} from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo-senac.png';

import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';


interface SignInFormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useContext(AuthContext)

    const handleSubmit = useCallback(
async (data: SignInFormData) => {
        console.log(data);
        try {

          formRef.current?.setErrors({});
    
          const schema = Yup.object().shape({
            email: Yup.string().required('E-mail obrigatório').email(),
            senha: Yup.string().required('Senha obrigatória')
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
          signIn({
            email: data.email,
            senha: data.senha,
          });
        } catch(err) {
            console.log(err);
        }
      },[signIn])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt='Logo senac' />
    
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
    
                    <Input name = 'email' icon={FiMail} type='email' placeholder='E-mail' />
    
                    <Input name = 'senha' icon={FiLock} type='password' placeholder='Senha' />
    
                    <Button type='submit'>Entrar</Button>
    
                    <a href='forgot'>Esqueci minha senha</a>
                </Form>
    
                <Link to="/signup" placeholder='criar conta'>
                    <FiLogIn/>
                        Criar conta
                </Link>
            </Content>
            <Background/>
        </Container>
        );
}
export default SignIn;