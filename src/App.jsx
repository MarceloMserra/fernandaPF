import { useState, useEffect } from 'react'
import './App.css'
import NetflixTheme from './components/NetflixTheme/NetflixTheme'
import Editor from './components/Editor/Editor'
import { Edit2, Play } from 'lucide-react'

const INITIAL_DATA = {
  title: "SUPER QUINTA",
  subtitle: "3ª Temporada - Episódio Março",
  metrics: [
    { id: 1, title: "Entregas do Setor", value: "12", subtext: "Projetos entregues com sucesso" },
    { id: 2, title: "Repagamentos", value: "125", subtext: "Recorde histórico do time" },
    { id: 3, title: "DEAs Concluídos", value: "42", subtext: "Eficiência operacional" },
    { id: 4, title: "Novos Clientes", value: "310", subtext: "Crescimento de 5% M/M" },
  ]
}

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('superQuintaData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('superQuintaData', JSON.stringify(data));
  }, [data]);

  return (
    <div className="app-container">
      {isEditing ? (
        <Editor 
          data={data} 
          onSave={(newData) => {
            setData(newData);
            setIsEditing(false);
          }} 
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <NetflixTheme data={data} />
      )}

      <button 
        className="mode-toggle"
        onClick={() => setIsEditing(!isEditing)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(50,50,50,0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          opacity: 0.3,
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
      >
        {isEditing ? <Play size={24} fill="white" /> : <Edit2 size={24} />}
      </button>
    </div>
  )
}

export default App
