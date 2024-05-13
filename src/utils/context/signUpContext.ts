import { createContext, useContext } from 'react';

export const SignUpContext = createContext<any>(null);
export const useSignUpContext = () => useContext(SignUpContext);
