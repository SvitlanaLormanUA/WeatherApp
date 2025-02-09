import React, { useState } from 'react';
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Cookies from 'js-cookie'; 
import '../styles/output.css';

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [loginErrorStr, setLoginErrorStr] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const validateLoginInput = (value: string) => {
        return /^[A-Za-z].*/.test(value);
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLogin(value);
        if (validateLoginInput(value)) {
            setLoginError(false);
        } else {
            setLoginError(true);
            setLoginErrorStr('Login must start with a letter');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(false);
    };

    const handleSubmit = () => {
        let hasError = false;

        if (!login) {
            setLoginError(true);
            setLoginErrorStr('Fill this field');
            hasError = true;
        }

        if (!password) {
            setPasswordError(true);
            hasError = true;
        }

        
        setFormValid(!hasError);

        if (!hasError) {
        
            Cookies.set('authToken', 'your_auth_token', { expires: 1 }); 
            console.log('Form submitted successfully!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/bg-image.jpeg')] bg-cover bg-center h-screen text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
                <Input
                    labelName='Login'
                    value={login}
                    onChange={handleLoginChange}
                    isError={loginError}
                    errorMessage={loginErrorStr}
                />
                <Input
                    labelName='Password'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    isError={passwordError}
                    errorMessage="Fill this field"
                />
                <SubmitButton
                    onClick={handleSubmit}
                    link="/statistics"
                    isFormValid={formValid} 
                >
                    Submit
                </SubmitButton>
            </div>
        </div>
    );
}
