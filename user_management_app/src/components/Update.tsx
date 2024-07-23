import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import qs from 'qs';

interface User {
    id: string
    nome: string
    email: string
}

const UpdateUser: React.FC = () => {
    let { id } = useParams<{ id: string }>()

    const [user, setUser] = useState<User | null>(null)
    const [inputs, setInputs] = useState<{ [key: string]: string }>({})
    const [AlertMessage, setAlertMessage] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputs(values => ({...values, [name]: value}))
    }

    const handleGetUser = async (id: any) => {
        try {
            if(!inputs.nome || inputs.email) {
                setAlertMessage("Preencha o formulario")
            }else{
                const response = await api.get('/users');
                const fetchedUsers: User[] = response.data.users;
                const foundUser = fetchedUsers.find((userData: any) => userData.id === id);
        
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    setAlertMessage(`Usuário com ID ${id} não encontrado.`);
                }
            }
        } catch (error) {
            setAlertMessage('Ocorreu um erro ao buscar o usuário. Por favor, tente novamente.');
        }
    }

    const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(inputs.nome === "" || inputs.email === "") {
            setAlertMessage("Preenchar o email e senha.")
        }else {
            try {
                await api.put(`/users/${id}`, qs.stringify({
                    'nome': inputs.nome,
                    'email': inputs.email,
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})

                setAlertMessage("Usuario atualizado com sucesso")
            } catch(error) {
                setAlertMessage("Ocorreu algum problema, tente novamente!!!")
            }
        }
    }

    useEffect(() => {
        handleGetUser(id)
    }, [])

    return (
        <div className="container mt-5">
          <h1 className="mb-4">Detalhes do Usuário</h1>
          <p className="text-muted">ID do usuário: {id}</p>
          {user ? (
            <form onSubmit={handleUpdateSubmit} className="border p-4 rounded bg-light shadow-sm">
              {AlertMessage && <div className="alert alert-info">{AlertMessage}</div>}
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input type="text" id="nome" name="nome" defaultValue={user.nome} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="email" defaultValue={user.email} onChange={handleChange} className="form-control" />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Atualizar</button>
              </div>
            </form>
          ) : (
            <p>Carregando usuário...</p>
          )}
          <Link to="/dashboard" className="btn btn-link mt-3">Voltar para o início</Link>
        </div>
    );
};

export default UpdateUser