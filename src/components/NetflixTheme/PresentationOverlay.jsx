import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './PresentationOverlay.css';

const PresentationOverlay = ({ data, onClose }) => {
    const [step, setStep] = useState(0); // 0: Intro, 1: Metrics, 2: Charts, 3: Outro
    const [currentMetric, setCurrentMetric] = useState(0);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        // Sequence Timing
        const sequence = async () => {
            // Step 0: Intro "Super Quinta Presents"
            await new Promise(r => setTimeout(r, 4000));

            // Step 1: Metric Showcase (Cycle through items)
            setStep(1);
            for (let i = 0; i < data.metrics.length; i++) {
                setCurrentMetric(i);
                await new Promise(r => setTimeout(r, 4000)); // Increased time for reading details
            }

            // Step 2: Charts/Recap
            setStep(2);
            setTimeout(() => setShowChart(true), 500); // Slight delay for entrance
            await new Promise(r => setTimeout(r, 8000)); // Time to watch the chart grow

            // Step 3: Outro
            setStep(3);
            await new Promise(r => setTimeout(r, 5000));

            // Done
            onClose();
        };

        sequence();
    }, [data.metrics.length, onClose]);

    return (
        <div className="presentation-overlay">
            <button className="close-btn" onClick={onClose}>✕</button>

            {step === 0 && (
                <div className="scene intro-scene">
                    <h1 className="studio-title">{data.title.toUpperCase()}</h1>
                    <p className="presents-text">PRESENTS</p>
                </div>
            )}

            {step === 1 && (
                <div className="scene metric-scene">
                    <div className="metric-highlight keyframe-pop">
                        <span className="metric-label-top">{data.metrics[currentMetric].title}</span>
                        <span className="metric-value">{data.metrics[currentMetric].value}</span>
                        <span className="metric-subtext">{data.metrics[currentMetric].subtext}</span>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="scene chart-scene">
                    <h2>GROWTH TRAJECTORY</h2>
                    <div className="cinematic-chart-container">
                        {showChart && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data.charts.trend}>
                                    <defs>
                                        <linearGradient id="colorCinematic" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E50914" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                    <XAxis dataKey="name" stroke="#fff" tick={{ fontSize: 14 }} />
                                    <YAxis stroke="#fff" tick={{ fontSize: 14 }} />
                                    <Area
                                        type="monotone"
                                        dataKey="Repagamentos"
                                        stroke="#E50914"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorCinematic)"
                                        isAnimationActive={true}
                                        animationDuration={3000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="scene outro-scene">
                    <h1>{data.subtitle}</h1>
                    <p>COMING SOON</p>
                </div>
            )}
        </div>
    );
};

export default PresentationOverlay;
