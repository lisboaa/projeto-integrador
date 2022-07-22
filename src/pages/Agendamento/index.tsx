import React, { useCallback, useRef } from "react";
import {  FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { Container, Header,HeaderContent, Profile } from '../DashBoard/styles';
import {  useHistory } from 'react-router-dom';
import { Content} from './styles';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface AgendamentoFormData {
    dataInicio: string;
    dataFim: string;
    horarioInicio: string;
    horarioFim: string;
    nomeInstrutor: String;
    curso: String;
    laboratorio: String;
    quantidadeDeAlunos: Number;
    numeroLaboratorio: Number;
    emailInstrutor: String;
    
}

const Scheduled: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signOut } = useAuth();
    const history = useHistory();
    const { addToast } = useToast();
    
    const handleSubmit = useCallback(async (data: AgendamentoFormData) => {
        console.log(data);
        
        try {

          formRef.current?.setErrors({});
          
          await api.post('api/salvarAgendamento', data);

          history.push('/dashboard');

          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon.',
          });

          formRef.current?.reset();

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
            <Header>
                <HeaderContent>
                    {/* <img src={logoImg} alt="Logo senac" /> */}
                    <Profile>
                        <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />
                        <div>
                            <span>Bem-vindo</span>
                            <strong>Douglas Lisboa</strong>
                        </div>
                    </Profile>

                    <button  onClick={signOut} type="button">
                        <FiPower/>
                    </button>
                </HeaderContent>
            </Header>
                <Content>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input name = 'dataInicio' type='date' placeholder='Data de inicio' />
                        <Input name = 'dataFim' type='date' placeholder='Data de termino' />
                        <Input name = 'horarioInicio' type='time' placeholder='Horario inicial' />
                        <Input name = 'horarioFim' type='time' placeholder='Horario final' />
                        <Input name = 'nomeInstrutor' type='name' placeholder='Nome instrutor' />
                        <Input name = 'emailInstrutor' type='name' placeholder='Email instrutor' />
                        <Input name = 'curso' type='name' placeholder='Nome do curso' />
                        <Input name = 'quantidadeDeAlunos' type='number' placeholder='Quantidade de alunos' />
                        <Input name = 'numeroLaboratorio' type='number' placeholder='Numero laboratorio' />
                        <Button type='submit'>Agendar</Button>
                    </Form>
                    
                </Content>
        </Container>
    )
}

export default Scheduled;