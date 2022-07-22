import React, {useRef, useCallback} from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo-senac.png';

import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
// import { keyframes } from 'styled-components';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';


interface SignInFormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    // console.log("SIGNIN 1");
    const {  signIn } = useAuth();
    const history = useHistory();
    // console.log("SIGNIN 2" + instrutor);
    
    const { addToast } = useToast();
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
          
          await signIn({
            email: data.email,
            senha: data.senha,
          });

          formRef.current?.reset();
          console.log("enviado para dashboard");
          
          history.push('/dashboard');

          addToast({
            type: 'success',
            title: 'Login realizado com successo',
            description: '',
          });
        } catch(err) {
            console.log(err);
            addToast({
              type: 'error',
              title: 'Erro na authenticação',
              description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
            });
          }
      },
      [signIn, addToast]
      // [addToast]
    );

    return (
        <Container> 
            <Content>
            <AnimationContainer>
              <img src={logoImg} alt='Logo senac' />
                <Form ref={formRef} onSubmit={handleSubmit}>
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
            </AnimationContainer>
                
            </Content>
            <Background/>
        </Container>
        );
}
export default SignIn;