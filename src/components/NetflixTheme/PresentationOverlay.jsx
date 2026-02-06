import { useEffect, useState, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './PresentationOverlay.css';

// Hook for counting up numbers
const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const endVal = parseInt(end, 10);
        if (isNaN(endVal)) return;

        const incrementTime = (duration / endVal) * Math.abs(endVal - start);
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === endVal) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [end, duration]);
    return count;
};

const MetricSlide = ({ metric }) => {
    const count = useCounter(metric.value, 1500);

    return (
        <div className="hud-metric-container">
            <div className="hud-line-top"></div>
            <h3 className="hud-label">{metric.title}</h3>
            <div className="hud-value-wrapper">
                <span className="hud-value">{count}</span>
            </div>
            <p className="hud-subtext">{metric.subtext}</p>
            <div className="hud-line-bottom"></div>
            <div className="scan-line"></div>
        </div>
    );
};

const PresentationOverlay = ({ data, onClose }) => {
    // Safety check for data
    if (!data || !data.metrics || !data.charts) return null;

    const [step, setStep] = useState(0); // 0: Boot, 1: Metrics, 2: Pre-Chart, 3: Chart, 4: Outro
    const [currentMetric, setCurrentMetric] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // Step 0: System Boot
            await new Promise(r => setTimeout(r, 2000));
            setStep(1);

            // Step 1: Metrics Loop
            for (let i = 0; i < data.metrics.length; i++) {
                setCurrentMetric(i);
                await new Promise(r => setTimeout(r, 4000));
            }

            // Step 2: System Loading for Chart
            setStep(2);
            for (let i = 0; i <= 100; i += 5) {
                setLoadingProgress(i);
                await new Promise(r => setTimeout(r, 50));
            }
            await new Promise(r => setTimeout(r, 500));

            // Step 3: HUD Chart
            setStep(3);
            await new Promise(r => setTimeout(r, 8000));

            // Step 4: Outro
            setStep(4);
            await new Promise(r => setTimeout(r, 4000));

            onClose();
        };
        sequence();
    }, [data, onClose]);

    return (
        <div className="presentation-overlay">
            <button className="close-btn" onClick={onClose}>✕</button>
            <div className="noise-bg"></div>
            <div className="vignette"></div>

            {step === 0 && (
                <div className="scene boot-scene">
                    <div className="terminal-text">
                        <p>{">"} INITIALIZING SYSTEM...</p>
                        <p>{">"} LOADING DATA MODULES...</p>
                        <p>{">"} ACCESS GRANTED.</p>
                        <h1 className="glitch-text" data-text={data.title}>{data.title}</h1>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="scene metric-scene">
                    <MetricSlide metric={data.metrics[currentMetric]} />
                </div>
            )}

            {step === 2 && (
                <div className="scene loading-scene">
                    <h2>ANALYZING TRAJECTORY</h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${loadingProgress}%` }}></div>
                    </div>
                    <div className="status-text">{loadingProgress}% COMPLETE</div>
                </div>
            )}

            {step === 3 && (
                <div className="scene chart-scene">
                    <div className="hud-chart-frame">
                        <div className="hud-header">
                            <span>GROWTH_VECTOR_ANALYSIS</span>
                            <span>[LIVE DATA]</span>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.charts.trend}>
                                    <defs>
                                        <linearGradient id="colorHud" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.6} />
                                            <stop offset="95%" stopColor="#00f2ff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#00f2ff" tick={{ fontFamily: 'monospace' }} />
                                    <YAxis stroke="#00f2ff" tick={{ fontFamily: 'monospace' }} />
                                    <Area
                                        type="monotone"
                                        dataKey="Repagamentos"
                                        stroke="#00f2ff"
                                        strokeWidth={3}
                                        fill="url(#colorHud)"
                                        isAnimationActive={true}
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="hud-footer">
                            <span>CONFIDENCE: 99.9%</span>
                            <span>SOURCE: SUPER_QUINTA_DB</span>
                        </div>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="scene outro-scene">
                    <h1 className="outro-title">SESSION COMPLETE</h1>
                    <p className="blink">{data.subtitle}</p>
                </div>
            )}
        </div>
    );
};

export default PresentationOverlay;
