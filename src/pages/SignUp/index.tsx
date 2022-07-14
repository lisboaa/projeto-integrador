import React, {useCallback, useRef, useContext} from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo-senac.png';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface SignUpFormData {
  nome:string;
  email: string;
  senha: string;
}
const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

          await api.post('api/salvarUsuario', data);

          // history.push('/');

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon.',
          });

        } catch(err) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro!',
            description: 'Verifique as informações digitas.',
        });
        }
      },[addToast]);

    return (
        <Container>
        <Background/>
            <Content>
              <AnimationContainer>
                <img src={logoImg} alt='Logo senac' />
                
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name = 'nome' icon={FiUser} type='name' placeholder='Nome' />
                    <Input name = 'email' icon={FiMail} type='email' placeholder='E-mail' />

                    <Input name = 'senha' icon={FiLock} type='password' placeholder='Senha' />

                    <Button type='submit'>Cadastrar</Button>
                </Form>

                <Link to="/" placeholder='criar conta'>
                    <FiArrowLeft/>
                        Voltar para logon
                </Link>
              </AnimationContainer>
                
            </Content>
        </Container>
        );
}
export default SignUp;