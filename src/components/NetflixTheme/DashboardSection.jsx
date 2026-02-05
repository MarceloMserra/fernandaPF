import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import './DashboardSection.css';

const dataTrend = [
    { name: 'Sem 1', Repagamentos: 20, DEAs: 10, amt: 2400 },
    { name: 'Sem 2', Repagamentos: 45, DEAs: 22, amt: 2210 },
    { name: 'Sem 3', Repagamentos: 78, DEAs: 35, amt: 2290 },
    { name: 'Sem 4', Repagamentos: 102, DEAs: 38, amt: 2000 },
    { name: 'Sem 5', Repagamentos: 125, DEAs: 42, amt: 2181 },
];

const dataDist = [
    { name: 'Em Andamento', value: 400 },
    { name: 'Concluídos', value: 300 },
    { name: 'Atrasados', value: 50 },
    { name: 'Cancelados', value: 20 },
];

const COLORS = ['#E50914', '#ffffff', '#555555', '#222222'];

const DashboardSection = () => {
    return (
        <div className="dashboard-section">
            <h2 className="section-title">Análise de Performance - Season Recap</h2>

            <div className="charts-grid">
                {/* Gráfico de Área - Tendência */}
                <div className="chart-card">
                    <h3>Evolução de Repagamentos (Trend)</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataTrend}>
                                <defs>
                                    <linearGradient id="colorRepag" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#141414', borderColor: '#333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="Repagamentos" stroke="#E50914" fillOpacity={1} fill="url(#colorRepag)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de Barras - Comparativo */}
                <div className="chart-card">
                    <h3>Comparativo Semanal vs DEAs</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    cursor={{ fill: '#333' }}
                                    contentStyle={{ backgroundColor: '#141414', borderColor: '#333' }}
                                />
                                <Legend />
                                <Bar dataKey="Repagamentos" fill="#E50914" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="DEAs" fill="#f5f5f5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de Pizza - Distribuição */}
                <div className="chart-card">
                    <h3>Distribuição de Projetos</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataDist}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataDist.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#141414', borderColor: '#333', color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSection;
