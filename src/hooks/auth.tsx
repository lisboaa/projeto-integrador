import  React, { createContext,useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
    email?: string;
    instrutor: object;
}

interface SignInCredentials {
    nome?: string
    email: string;
    senha: string;
}

// interface SignUpCredentials {
//     nome:string;
//     email: string;
//     senha: string;
// }

interface Prop {
    children?: React.ReactNode
}

interface AuthContextData {
    // instrutor: object;
    signIn(credentials: SignInCredentials): Promise<void>; 
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Prop> = ({ children }) => {
    
    const [data, setData] = useState<AuthState>(() => {
        
        const email = localStorage.getItem('@Senac:email');
        const instrutor = localStorage.getItem('@Senac:instrutor');

        console.log("buscarndo os valores localstorage " + email + instrutor);
        
        if(instrutor) {
            console.log("etrando no parse do instrutor");
            
            return {instrutor: JSON.parse(instrutor)}
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, senha }:SignInCredentials) => {

        const response = await api.post('api/v2/login', {
            email,
            senha
        })

        const { email : emailUser } = response.data;
        const { data: instrutor } = response;

        localStorage.setItem('@Senac:email', emailUser);
        localStorage.setItem('@Senac:instrutor', JSON.stringify(instrutor));

        console.log(response.status);
        
        setData({ email, instrutor })
        
    }, []);
    
    const signOut = useCallback(() => {
        localStorage.removeItem('@Senac:email');
        localStorage.removeItem('@Senac:instrutor');

        // setData({} as AuthState)
    },[]);

    return(
        <AuthContext.Provider value={{ signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
     console.log("retornando o context " + context);
     
    if(!context) {
        throw new Error('useAuth must be userd within a AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };