import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  nome: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [AlertMessage, setAlertMessage] = useState<string | null>(null);

  const handleGetUsers = async () => {
    try {
      const response = await api.get('/users');
      const fetchedUsers: User[] = Object.keys(response.data.users).map(key => ({
        id: key,
        ...response.data.users[key],
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      setAlertMessage('Aconteceu algum erro, tente novamente');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await api.delete(`/users/${id}`);
      setAlertMessage(response.data.message);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setAlertMessage('Aconteceu algum erro, tente novamente');
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="shadow p-4 bg-body-tertiary rounded w-100" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="mb-0">Lista de Usuários</h1>
          <Link to="/add" className="btn btn-success">Adicionar Usuário</Link>
        </div>
        {AlertMessage && <div className="alert alert-info">{AlertMessage}</div>}
        <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {users.map(user => (
            <div className="card mb-3" key={user.id}>
              <div className="card-body position-relative">
                <h5 className="card-title">{user.nome} - {user.email}</h5>
                <div className="d-grid gap-2">
                  <Link to={`/update/${user.id}`} className="btn btn-primary">Atualizar Usuário</Link>
                </div>
                <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={() => handleDeleteUser(user.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;