import React, { ChangeEvent, FormEvent, useState } from 'react';
import qs from 'qs';
import api from '../services/api';
import { Link } from 'react-router-dom';

const AddUser: React.FC = () => {
    const [inputs, setInputs] = useState<{ [key: string]: string }>({})
    const [AlertMessage, setAlertMessage] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputs(values => ({...values, [name]: value}))
    }

    const handleAddUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(inputs.name === "" || inputs.email === "" || inputs.password  === "") {
            setAlertMessage("Preenchar o email e senha.")
        }else {
            try {
                await api.post('/users', qs.stringify({
                    'nome': inputs.name,
                    'email': inputs.email,
                    'senha': inputs.password
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})

                setAlertMessage("Usuario adicionado com sucesso")
            } catch(error) {
                setAlertMessage("Ocorreu algum problema, tente novamente!!!")
            }
        }
    }

    return (
        <div className="container mt-5">
          <h1 className="mb-4">Adicionar Novo Usuário</h1>
          <form onSubmit={handleAddUserSubmit} className="border p-4 rounded bg-light shadow-sm">
            {AlertMessage && <div className="alert alert-info">{AlertMessage}</div>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nome</label>
              <input type="text" id="name" name="name" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Digite seu email</label>
              <input type="email" id="email" name="email" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Digite sua senha</label>
              <input type="password" id="password" name="password" onChange={handleChange} className="form-control" required />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Criar Usuário</button>
            </div>
          </form>
          <Link to="/dashboard" className="btn btn-link mt-3">Voltar para o início</Link>
        </div>
    );
};

export default AddUser;