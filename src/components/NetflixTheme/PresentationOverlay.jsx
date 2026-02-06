import { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import './PresentationOverlay.css';

const PresentationOverlay = ({ data, onClose }) => {
    // Safety check
    if (!data || !data.metrics || !data.charts) return null;

    const [scene, setScene] = useState('intro'); // intro, title, metrics, chart_trend, chart_bar, chart_pie, outro
    const [metricIndex, setMetricIndex] = useState(0);
    const [chartVisible, setChartVisible] = useState(false);

    // Total metrics count
    const metricsCount = data.metrics.length;
    const COLORS = ['#E50914', '#ffffff', '#555555', '#222222'];

    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            // 1. INTRO
            await wait(3000);
            if (!mounted) return;

            // 2. TITLE
            setScene('title');
            await wait(4000);
            if (!mounted) return;

            // 3. METRICS
            setScene('metrics');
            for (let i = 0; i < metricsCount; i++) {
                setMetricIndex(i);
                await wait(4500);
                if (!mounted) return;
            }

            // 4. CHART: TREND (AREA)
            setScene('chart_trend');
            setChartVisible(false);
            setTimeout(() => setChartVisible(true), 500);
            await wait(8000);
            if (!mounted) return;

            // 5. CHART: COMPARISON (BAR)
            setScene('chart_bar');
            setChartVisible(false);
            setTimeout(() => setChartVisible(true), 500);
            await wait(8000);
            if (!mounted) return;

            // 6. CHART: DISTRIBUTION (PIE)
            setScene('chart_pie');
            setChartVisible(false);
            setTimeout(() => setChartVisible(true), 500);
            await wait(8000);
            if (!mounted) return;

            // 7. OUTRO
            setScene('outro');
            await wait(6000);
            if (!mounted) return;

            onClose();
        };

        runSequence();

        return () => { mounted = false; };
    }, [metricsCount, onClose]);

    // Helper for pauses
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const currentMetricData = data.metrics[metricIndex];

    // Determine next month based on subtitle or default
    const getNextMonth = () => {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const currentSub = data.subtitle || "";
        // Simple heuristic: if 'Março' is in subtitle, return 'Abril'
        if (currentSub.includes("Março")) return "Abril";
        if (currentSub.includes("Fevereiro")) return "Março";
        if (currentSub.includes("Abril")) return "Maio";
        return "Próximo Mês";
    };

    return (
        <div className={`presentation-overlay scene-${scene}`}>
            <button className="close-btn" onClick={onClose}>Pular</button>

            {/* Ambient Background */}
            <div className="ambient-background"></div>

            {/* SCENE 1: INTRO */}
            {scene === 'intro' && (
                <div className="content-container intro-content">
                    <span className="netflix-tag">ORIGINAL SUPER QUINTA</span>
                    <div className="intro-line"></div>
                </div>
            )}

            {/* SCENE 2: TITLE */}
            {scene === 'title' && (
                <div className="content-container title-content">
                    <h1 className="cinematic-title">{data.title}</h1>
                    <p className="cinematic-subtitle">{data.subtitle}</p>
                </div>
            )}

            {/* SCENE 3: METRICS */}
            {scene === 'metrics' && (
                <div className="content-container metric-content" key={metricIndex}>
                    <div className="metric-left">
                        <span className="metric-id">{String(metricIndex + 1).padStart(2, '0')}</span>
                        <h2 className="metric-label">{currentMetricData.title}</h2>
                        <div className="metric-bar"></div>
                    </div>
                    <div className="metric-right">
                        <span className="metric-number">{currentMetricData.value}</span>
                        <p className="metric-desc">{currentMetricData.subtext}</p>
                    </div>
                </div>
            )}

            {/* CHART 1: TREND */}
            {scene === 'chart_trend' && (
                <div className="content-container chart-content">
                    <h2 className="chart-headline">Evolução de Repagamentos</h2>
                    <div className="chart-canvas">
                        {chartVisible && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.charts.trend}>
                                    <defs>
                                        <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E50914" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <YAxis hide domain={['dataMin', 'dataMax']} />
                                    <Area
                                        type="monotone"
                                        dataKey="Repagamentos"
                                        stroke="#E50914"
                                        strokeWidth={6}
                                        fill="url(#colorPremium)"
                                        isAnimationActive={true}
                                        animationDuration={3000}
                                        animationEasing="ease-out"
                                        label={{ position: 'top', fill: 'white', fontSize: 20, fontWeight: 'bold' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="chart-footer">
                        <span>Análise de Tendência</span>
                        <span>Dados em Tempo Real</span>
                    </div>
                </div>
            )}

            {/* CHART 2: COMPARISON */}
            {scene === 'chart_bar' && (
                <div className="content-container chart-content">
                    <h2 className="chart-headline">Comparativo vs DEAs</h2>
                    <div className="chart-canvas">
                        {chartVisible && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.charts.trend} barGap={10}>
                                    <YAxis hide />
                                    <Legend wrapperStyle={{ color: '#fff' }} />
                                    <Bar
                                        dataKey="Repagamentos"
                                        fill="#E50914"
                                        radius={[4, 4, 0, 0]}
                                        animationDuration={2500}
                                        label={{ position: 'top', fill: 'white', fontSize: 16 }}
                                    />
                                    <Bar
                                        dataKey="DEAs"
                                        fill="#fff"
                                        radius={[4, 4, 0, 0]}
                                        animationDuration={3000}
                                        label={{ position: 'top', fill: '#bbb', fontSize: 16 }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            )}

            {/* CHART 3: PIE */}
            {scene === 'chart_pie' && (
                <div className="content-container chart-content">
                    <h2 className="chart-headline">Distribuição de Projetos</h2>
                    <div className="chart-canvas">
                        {chartVisible && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.charts.dist}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={100}
                                        outerRadius={180}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        isAnimationActive={true}
                                        animationDuration={2000}
                                        animationBegin={200}
                                        stroke="none"
                                    >
                                        {data.charts.dist.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            )}

            {/* SCENE 7: OUTRO */}
            {scene === 'outro' && (
                <div className="content-container outro-content">
                    <p className="outro-text">Até a próxima apresentação da nossa</p>
                    <h1 className="outro-highlight">SUPER QUINTA</h1>
                    <p className="outro-text">do mês de {getNextMonth()}</p>
                    <br /><br />
                    <div className="dpag-logo">DPAG</div>
                </div>
            )}
        </div>
    );
};

export default PresentationOverlay;
