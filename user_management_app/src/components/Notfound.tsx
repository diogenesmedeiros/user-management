import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h1 className="display-4">404 - Not Found</h1>
            <p className="lead">A página que você está procurando não existe.</p>
            <Link to="/dashboard" className="btn btn-primary mt-3">
              Voltar para o início
            </Link>
          </div>
        </div>
    );
}

export default NotFound