import React, {useCallback, useRef, useContext} from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo-senac.png';
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';

interface SignInFormData {
  nome:string;
  email: string;
  senha: string;
}
const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signUp } = useContext(AuthContext)

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        console.log(data);
        
        try {

          formRef.current?.setErrors({});
    
          const schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório').email(),
            senha: Yup.string()
            .min(6, 'No mínimo 6 digitos')
          })
    
          await schema.validate(data, {
            abortEarly: false,
          });
          signUp({
            nome: data.nome,
            email: data.email,
            senha: data.senha
          });
        } catch(err) {
            console.log(err);
        }
      },[signUp]);

    return (
        <Container>
        <Background/>
            <Content>
                <img src={logoImg} alt='Logo senac' />
    
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
    
                    <Input name = 'nome' icon={FiUser} type='name' placeholder='Nome' />
                    <Input name = 'email' icon={FiMail} type='email' placeholder='E-mail' />
    
                    <Input name = 'senha' icon={FiLock} type='password' placeholder='Senha' />
    
                    <Button type='submit'>Cadastrar</Button>
                </Form>
    
                <Link to="/login" placeholder='criar conta'>
                    <FiArrowLeft/>
                        Voltar para logon
                </Link>
            </Content>
        </Container>
        );
}
export default SignUp;