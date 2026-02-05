import { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

const Editor = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

    const styles = {
        container: {
            padding: '40px',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#fff'
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
            fontSize: '20px',
            borderBottom: '1px solid #333',
            paddingBottom: '10px',
            marginBottom: '20px',
            marginTop: '40px'
        },
        metricCard: {
            background: '#222',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '15px',
            border: '1px solid #333',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr auto',
            gap: '10px',
            alignItems: 'end'
        },
        button: {
            padding: '12px 24px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold'
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
        actionButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '40px',
            borderTop: '1px solid #333',
            paddingTop: '20px'
        }
    };

    return (
        <div style={styles.container}>
            <h1>Editor da Super Quinta</h1>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Título Principal</label>
                <input
                    style={styles.input}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Subtítulo / Episódio</label>
                <input
                    style={styles.input}
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                />
            </div>

            <h2 style={styles.sectionTitle}>Métricas e Dados</h2>

            {formData.metrics.map(metric => (
                <div key={metric.id} style={styles.metricCard}>
                    <div>
                        <label style={styles.label}>Título</label>
                        <input
                            style={styles.input}
                            value={metric.title}
                            onChange={(e) => handleMetricChange(metric.id, 'title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Valor</label>
                        <input
                            style={styles.input}
                            value={metric.value}
                            onChange={(e) => handleMetricChange(metric.id, 'value', e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Subtexto</label>
                        <input
                            style={styles.input}
                            value={metric.subtext}
                            onChange={(e) => handleMetricChange(metric.id, 'subtext', e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => removeMetric(metric.id)}
                        style={{ ...styles.button, background: '#333', padding: '10px' }}
                    >
                        <Trash2 size={20} color="#E50914" />
                    </button>
                </div>
            ))}

            <button
                onClick={addMetric}
                style={{ ...styles.button, background: '#333', width: '100%', justifyContent: 'center' }}
            >
                <Plus size={20} /> Adicionar Métrica
            </button>

            <div style={styles.actionButtons}>
                <button style={{ ...styles.button, ...styles.btnSecondary }} onClick={onCancel}>
                    Cancelar
                </button>
                <button style={{ ...styles.button, ...styles.btnPrimary }} onClick={() => onSave(formData)}>
                    <Save size={20} /> Salvar Alterações
                </button>
            </div>
        </div>
    );
};

export default Editor;
