import { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import './PresentationOverlay.css';

const PresentationOverlay = ({ data, onClose }) => {
    // Safety check
    if (!data || !data.metrics || !data.charts) return null;

    const [scene, setScene] = useState('intro'); // intro, title, metrics, chart, outro
    const [metricIndex, setMetricIndex] = useState(0);
    const [chartVisible, setChartVisible] = useState(false);

    // Total metrics count
    const metricsCount = data.metrics.length;

    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            // 1. INTRO: "A Super Quinta Original"
            await wait(3000);
            if (!mounted) return;

            // 2. TITLE: Big Show Title
            setScene('title');
            await wait(4000);
            if (!mounted) return;

            // 3. METRICS: Cycle through them
            setScene('metrics');
            for (let i = 0; i < metricsCount; i++) {
                setMetricIndex(i);
                // Dynamic timing: longer for first, faster for middle
                await wait(5000);
                if (!mounted) return;
            }

            // 4. CHART: The Reveal
            setScene('chart');
            // Allow scene transition before drawing chart
            setTimeout(() => setChartVisible(true), 1000);
            await wait(10000); // Give time to appreciate the chart
            if (!mounted) return;

            // 5. OUTRO: Fade out
            setScene('outro');
            await wait(4000);
            if (!mounted) return;

            onClose();
        };

        runSequence();

        return () => { mounted = false; };
    }, [metricsCount, onClose]);

    // Helper for pauses
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const currentMetricData = data.metrics[metricIndex];

    return (
        <div className={`presentation-overlay scene-${scene}`}>
            <button className="close-btn" onClick={onClose}>Skip</button>

            {/* Ambient Background */}
            <div className="ambient-background"></div>

            {/* SCENE 1: INTRO */}
            {scene === 'intro' && (
                <div className="content-container intro-content">
                    <span className="netflix-tag">A SUPER QUINTA ORIGINAL</span>
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

            {/* SCENE 4: CHART */}
            {scene === 'chart' && (
                <div className="content-container chart-content">
                    <h2 className="chart-headline">Growth Trajectory</h2>
                    <div className="chart-canvas">
                        {chartVisible && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.charts.trend}>
                                    <defs>
                                        <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fff" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <YAxis hide domain={['dataMin', 'dataMax']} />
                                    <Area
                                        type="monotone"
                                        dataKey="Repagamentos"
                                        stroke="#fff"
                                        strokeWidth={4}
                                        fill="url(#colorPremium)"
                                        isAnimationActive={true}
                                        animationDuration={3000}
                                        animationEasing="ease-in-out"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="chart-footer">
                        <span>Live Data Analysis</span>
                        <span>Q1 Performance</span>
                    </div>
                </div>
            )}

            {/* SCENE 5: OUTRO */}
            {scene === 'outro' && (
                <div className="content-container outro-content">
                    <div className="netflix-n">N</div>
                </div>
            )}
        </div>
    );
};

export default PresentationOverlay;
