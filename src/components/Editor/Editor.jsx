import { useState } from 'react';
import { Plus, Trash2, Save, X, BarChart2, PieChart } from 'lucide-react';

const Editor = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- METRICS HANDLERS ---
    const handleMetricChange = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.map(m => m.id === id ? { ...m, [field]: value } : m)
        }));
    };

    const addMetric = () => {
        const newId = Math.max(...formData.metrics.map(m => m.id), 0) + 1;
        setFormData(prev => ({
            ...prev,
            metrics: [...prev.metrics, { id: newId, title: "Novo Item", value: "0", subtext: "Descrição" }]
        }));
    };

    const removeMetric = (id) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.filter(m => m.id !== id)
        }));
    };

    // --- CHART HANDLERS: TREND ---
    const handleTrendChange = (index, field, value) => {
        const newTrend = [...formData.charts.trend];
        // Convert numbers if needed
        newTrend[index] = {
            ...newTrend[index],
            [field]: (field === 'Repagamentos' || field === 'DEAs') ? Number(value) : value
        };
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, trend: newTrend }
        }));
    };

    const addTrendRow = () => {
        const newRow = { name: 'Nova Sem', Repagamentos: 0, DEAs: 0, amt: 2000 };
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, trend: [...prev.charts.trend, newRow] }
        }));
    };

    const removeTrendRow = (index) => {
        const newTrend = formData.charts.trend.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, trend: newTrend }
        }));
    };

    // --- CHART HANDLERS: DISTRIBUTION ---
    const handleDistChange = (index, field, value) => {
        const newDist = [...formData.charts.dist];
        newDist[index] = {
            ...newDist[index],
            [field]: field === 'value' ? Number(value) : value
        };
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, dist: newDist }
        }));
    };

    const addDistRow = () => {
        const newRow = { name: 'Novo Item', value: 10 };
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, dist: [...prev.charts.dist, newRow] }
        }));
    };

    const removeDistRow = (index) => {
        const newDist = formData.charts.dist.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            charts: { ...prev.charts, dist: newDist }
        }));
    };

    const styles = {
        container: {
            padding: '40px',
            maxWidth: '900px',
            margin: '0 auto',
            color: '#fff',
            fontFamily: "'Inter', sans-serif"
        },
        inputGroup: {
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#aaa'
        },
        input: {
            width: '100%',
            padding: '12px',
            background: '#333',
            border: '1px solid #555',
            color: 'white',
            borderRadius: '4px',
            fontSize: '16px'
        },
        sectionTitle: {
            fontSize: '24px',
            borderBottom: '1px solid #333',
            paddingBottom: '10px',
            marginBottom: '20px',
            marginTop: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#E50914'
        },
        card: {
            background: '#222',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '15px',
            border: '1px solid #333',
            display: 'grid',
            gap: '10px',
            alignItems: 'end'
        },
        metricGrid: { gridTemplateColumns: '1fr 1fr 2fr auto' },
        trendGrid: { gridTemplateColumns: '1fr 1fr 1fr auto' },
        distGrid: { gridTemplateColumns: '2fr 1fr auto' },

        button: {
            padding: '12px 24px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
            transition: '0.2s'
        },
        btnPrimary: {
            background: '#E50914',
            color: 'white'
        },
        btnSecondary: {
            background: 'transparent',
            border: '1px solid #aaa',
            color: '#aaa',
            marginRight: '10px'
        },
        btnDanger: {
            background: '#333',
            padding: '10px',
            color: '#E50914',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '40px',
            borderTop: '1px solid #333',
            paddingTop: '20px',
            position: 'sticky',
            bottom: '20px',
            background: '#141414',
            paddingBottom: '20px',
            zIndex: 100
        }
    };

    return (
        <div style={styles.container}>
            <h1>Editor Super Quinta</h1>

            {/* --- GENERAL SETTINGS --- */}
            <div style={styles.inputGroup}>
                <label style={styles.label}>Título Principal</label>
                <input style={styles.input} name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Subtítulo / Mês</label>
                <input style={styles.input} name="subtitle" value={formData.subtitle} onChange={handleChange} />
            </div>

            {/* --- METRICS --- */}
            <h2 style={styles.sectionTitle}>Métricas (Topo do Site)</h2>
            {formData.metrics.map(metric => (
                <div key={metric.id} style={{ ...styles.card, ...styles.metricGrid }}>
                    <div>
                        <label style={styles.label}>Título</label>
                        <input style={styles.input} value={metric.title} onChange={(e) => handleMetricChange(metric.id, 'title', e.target.value)} />
                    </div>
                    <div>
                        <label style={styles.label}>Valor</label>
                        <input style={styles.input} value={metric.value} onChange={(e) => handleMetricChange(metric.id, 'value', e.target.value)} />
                    </div>
                    <div>
                        <label style={styles.label}>Subtexto</label>
                        <input style={styles.input} value={metric.subtext} onChange={(e) => handleMetricChange(metric.id, 'subtext', e.target.value)} />
                    </div>
                    <button onClick={() => removeMetric(metric.id)} style={styles.btnDanger}><Trash2 size={20} /></button>
                </div>
            ))}
            <button onClick={addMetric} style={{ ...styles.button, background: '#333', width: '100%', justifyContent: 'center' }}>
                <Plus size={20} /> Adicionar Métrica
            </button>

            {/* --- TREND CHART --- */}
            <h2 style={styles.sectionTitle}><BarChart2 /> Gráfico de Evolução (Semanal)</h2>
            {formData.charts.trend.map((row, index) => (
                <div key={index} style={{ ...styles.card, ...styles.trendGrid }}>
                    <div>
                        <label style={styles.label}>Semana (Eixo X)</label>
                        <input style={styles.input} value={row.name} onChange={(e) => handleTrendChange(index, 'name', e.target.value)} />
                    </div>
                    <div>
                        <label style={styles.label}>Repagamentos</label>
                        <input type="number" style={styles.input} value={row.Repagamentos} onChange={(e) => handleTrendChange(index, 'Repagamentos', e.target.value)} />
                    </div>
                    <div>
                        <label style={styles.label}>DEAs</label>
                        <input type="number" style={styles.input} value={row.DEAs} onChange={(e) => handleTrendChange(index, 'DEAs', e.target.value)} />
                    </div>
                    <button onClick={() => removeTrendRow(index)} style={styles.btnDanger}><Trash2 size={20} /></button>
                </div>
            ))}
            <button onClick={addTrendRow} style={{ ...styles.button, background: '#333', width: '100%', justifyContent: 'center' }}>
                <Plus size={20} /> Adicionar Semana
            </button>

            {/* --- DISTRIBUTION CHART --- */}
            <h2 style={styles.sectionTitle}><PieChart /> Distribuição de Projetos</h2>
            {formData.charts.dist.map((row, index) => (
                <div key={index} style={{ ...styles.card, ...styles.distGrid }}>
                    <div>
                        <label style={styles.label}>Nome da Categoria</label>
                        <input style={styles.input} value={row.name} onChange={(e) => handleDistChange(index, 'name', e.target.value)} />
                    </div>
                    <div>
                        <label style={styles.label}>Quantidade</label>
                        <input type="number" style={styles.input} value={row.value} onChange={(e) => handleDistChange(index, 'value', e.target.value)} />
                    </div>
                    <button onClick={() => removeDistRow(index)} style={styles.btnDanger}><Trash2 size={20} /></button>
                </div>
            ))}
            <button onClick={addDistRow} style={{ ...styles.button, background: '#333', width: '100%', justifyContent: 'center' }}>
                <Plus size={20} /> Adicionar Categoria
            </button>

            {/* --- ACTIONS --- */}
            <div style={styles.actionButtons}>
                <button
                    style={{ ...styles.button, background: '#333', color: '#fff', marginRight: 'auto' }}
                    onClick={() => {
                        const json = JSON.stringify(formData, null, 2);
                        navigator.clipboard.writeText(json);
                        alert("Configuração copiada! Cole no chat para eu atualizar o site oficial.");
                    }}
                >
                    📋 Copiar para IA
                </button>
                <button style={{ ...styles.button, ...styles.btnSecondary }} onClick={onCancel}>Cancelar</button>
                <button style={{ ...styles.button, ...styles.btnPrimary }} onClick={() => onSave(formData)}>
                    <Save size={20} /> Salvar Localmente
                </button>
            </div>
        </div>
    );
};

export default Editor;
