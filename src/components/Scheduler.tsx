import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Scheduler.css';

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const hours = [18, 19, 20, 21, 22, 23];

const Scheduler = ({ username, onLogout }: { username: string; onLogout: () => void }) => {
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const snap = await getDoc(doc(db, 'estado', 'horario'));
        if (snap.exists()) {
          const data = snap.data();
          setSchedule(data.horario || {});
        }
      } catch (error) {
        console.error('Error al obtener horario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const toggleCell = async (day: string, hour: number) => {
    const key = `${day}-${hour}`;
    const updated = { ...schedule };
    updated[key] = updated[key] || [];

    if (updated[key].includes(username)) {
      updated[key] = updated[key].filter(n => n !== username);
    } else {
      updated[key].push(username);
    }

    setSchedule(updated);
    await setDoc(doc(db, 'estado', 'horario'), { horario: updated });
  };

  if (loading) return <p>Cargando grilla...</p>;

  return (
    <div className="scheduler-container">
      <div className="scheduler-header">
        <h3>
          Anotese en todos los horarios que tiene disponibles para jugar futbol
        </h3>
        <button onClick={onLogout}>Cerrar sesión</button>
        
      </div>
      <div className="grid">
        <div className="grid-row header">
          <div className="grid-cell">Hora</div>
          {days.map(day => <div key={day} className="grid-cell">{day}</div>)}
        </div>
        {hours.map(hour => (
          <div className="grid-row" key={hour}>
            <div className="grid-cell time">{hour}:00</div>
            {days.map(day => {
              const key = `${day}-${hour}`;
              const users = schedule[key] || [];
              const isMe = users.includes(username);
              return (
                <div key={key} className={`grid-cell block ${isMe ? 'me' : ''}`} onClick={() => toggleCell(day, hour)}>
                  {users.map(u => <div key={u} className="participant">{u}</div>)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
