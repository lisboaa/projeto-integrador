import  React, { createContext,useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
    nome?: string
    email: string;
    senha: string;
}

interface SignUpCredentials {
    nome:string;
    email: string;
    senha: string;
}

interface Prop {
    children?: React.ReactNode
}

interface AuthContextData {
    nome: string;
    signIn(creadential: SignInCredentials): Promise<void>; 
    signUp(creadential: SignInCredentials):Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Prop> = ({ children }) => {
    const signUp = useCallback(async ({ nome, email, senha }:SignUpCredentials) => {
        const response = await api.post('instrutor', {
            nome,
            email,
            senha
        })
        console.log(response.data);
        
    }, []);

    const signIn = useCallback(async ({ email, senha }:SignInCredentials) => {
        const response = await api.post('instrutor', {
            email,
            senha
        })
        console.log(response.data);
        
    }, []);

    return(
        <AuthContext.Provider value={{ nome:'Douglas', signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };