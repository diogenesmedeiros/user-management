import React, { ChangeEvent, FormEvent, useState } from 'react';
import qs from 'qs';
import api from '../services/api';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState<{ [key: string]: string }>({})
    const [AlertMessage, setAlertMessage] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputs(values => ({...values, [name]: value}))
    }

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!inputs.email || !inputs.password) {
            setAlertMessage("Preenchar o email e senha.")
        }else {
            try {
                const response = await api.post('/users/login', qs.stringify({
                    'email': inputs.email,
                    'senha': inputs.password
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})

                login(response.data.data.token)

                navigate('/dashboard')
            } catch(error) {
                setAlertMessage("Ocorreu algum problema, tente novamente!!!")
            }
        }
    }

    return (
        <div className="container mt-5">
          <h1 className="mb-4">Login</h1>
          <form onSubmit={handleLoginSubmit} className="border p-4 rounded bg-light shadow-sm">
            {AlertMessage && <div className="alert alert-info">{AlertMessage}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Digite seu email</label>
              <input type="email" id="email" name="email" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Digite sua senha</label>
              <input type="password" id="password" name="password" onChange={handleChange} className="form-control" required />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
          </form>
        </div>
    );
};

export default Login;