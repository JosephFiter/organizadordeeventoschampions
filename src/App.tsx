// App.tsx
import  { useEffect, useState } from 'react';
import Login from './components/Login';
import Scheduler from './components/Scheduler';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [storedName, setStoredName] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchName = async () => {
      const docSnap = await getDoc(doc(db, 'estado'));
      if (docSnap.exists()) setStoredName(docSnap.data().nombre);
    };
    fetchName();
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setStoredName(savedName);
    }
  }, []);

   const handleLogin = (name: string) => {
    setUsername(name);
    localStorage.setItem('username', name); // Guardo localmente
  };
  
   const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('username'); // Borro el localStorage al salir
  };

  return username
    ? <Scheduler username={username} onLogout={handleLogout} />
    : <Login storedName={storedName} onLogin={handleLogin} />;
};

export default App;
