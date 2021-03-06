import styled,{ keyframes} from 'styled-components';
import signInBackground from '../../assets/login.png';
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    width: 100%;
    max-width: 700px;
`;
export const appearFromRight = keyframes`
from{
    opacity:0;
    transform: translateX(50px);
}

to {
    opacity: 1;
    transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

animation: ${appearFromRight} 1s;

form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
        margin-bottom: 24px;
        color: rgba(255, 144, 0, 1);
        
    }

    a {
        color: rgba(255, 144, 0, 1);
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: ${shade(0.1, 'rgba(255, 144, 0, 1)')}
        }
    }
}

> a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
        margin-right: 16px;
    }

    &:hover {
            color: ${shade(0.1, 'rgba(255, 144, 0, 1)')}
        }
}
`;


export const Background = styled.div`
    flex: 1;
    background: url(${signInBackground}) no-repeat center;
    background-size: cover;
`;