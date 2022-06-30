import React from 'react';
import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
    return (
        <Container>
            <Toast hasDescription>
                <FiAlertCircle/>
                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login na aplicação</p>
                </div>

                <button type='button'>
                    <FiXCircle size={18}/>
                </button>
            </Toast>
            <Toast type='success' hasDescription={false}>
                <FiAlertCircle/>
                <div>
                    <strong>Aconteceu um erro</strong>
                </div>

                <button type='button'>
                    <FiXCircle size={18}/>
                </button>
            </Toast>
             <Toast type='error' hasDescription={true}>
                <FiAlertCircle/>
                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possivel fazer login na aplicação</p>
                </div>

                <button type='button'>
                    <FiXCircle size={18}/>
                </button>
            </Toast>
        </Container>
    );
};

export default ToastContainer;