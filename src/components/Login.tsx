import React, { useState } from 'react';
import './Login.css';

const Login = ({
  storedName,
  onLogin,
}: {
  storedName: string | null;
  onLogin: (name: string) => void;
}) => {
  const [name, setName] = useState('');

  const [asked, setAsked] = useState(true); // para saber si ya preguntamos "¿Sos?"

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem('username', newName); // guardo en localStorage cada cambio
  };

  // Si hay storedName y preguntamos "¿Sos ...?"
  if (storedName && asked) {
    return (
      <div className="login-container">
        <h2>¿Sos {storedName}?</h2>
        <button
          onClick={() => {
            onLogin(storedName);
          }}
        >
          Sí
        </button>
        <button
          onClick={() => {
            setAsked(false); // usuario dice que no, mostramos el input
          }}
        >
          No
        </button>
      </div>
    );
  }

  // Si no hay storedName o usuario dijo no, mostrar input normal
  return (
    
    <div className="login-container">
      <h1 className="login-title">Bienvenido al organizador de eventos de Champions</h1>

      <h2>¿Cómo te llamás?</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={handleNameChange}
      />
      <button onClick={() => name && onLogin(name)}>Entrar</button>
      <h4>Por ahora solo futbol, más tipos de eventos disponibles proximamente</h4>
    </div>
  );
};

export default Login;
