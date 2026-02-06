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
  ],
  charts: {
    trend: [
      { name: 'Sem 1', Repagamentos: 20, DEAs: 10, amt: 2400 },
      { name: 'Sem 2', Repagamentos: 45, DEAs: 22, amt: 2210 },
      { name: 'Sem 3', Repagamentos: 78, DEAs: 35, amt: 2290 },
      { name: 'Sem 4', Repagamentos: 102, DEAs: 38, amt: 2000 },
      { name: 'Sem 5', Repagamentos: 125, DEAs: 42, amt: 2181 },
    ],
    dist: [
      { name: 'Em Andamento', value: 400 },
      { name: 'Concluídos', value: 300 },
      { name: 'Atrasados', value: 50 },
      { name: 'Cancelados', value: 20 },
    ]
  }
}

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('superQuintaData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge or at least ensure new keys exist
        return {
          ...INITIAL_DATA,
          ...parsed,
          // Ensure charts object exists and has data if missing in saved
          charts: parsed.charts || INITIAL_DATA.charts,
          metrics: parsed.metrics || INITIAL_DATA.metrics
        };
      } catch (e) {
        console.error("Error parsing saved data, resetting:", e);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
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
