import { useEffect, useState } from 'react';
import './PresentationOverlay.css';

const PresentationOverlay = ({ data, onClose }) => {
    const [step, setStep] = useState(0); // 0: Intro, 1: Metrics, 2: Charts, 3: Outro
    const [currentMetric, setCurrentMetric] = useState(0);

    useEffect(() => {
        // Sequence Timing
        const sequence = async () => {
            // Step 0: Intro "Super Quinta Presents"
            await new Promise(r => setTimeout(r, 4000));

            // Step 1: Metric Showcase (Cycle through items)
            setStep(1);
            for (let i = 0; i < data.metrics.length; i++) {
                setCurrentMetric(i);
                await new Promise(r => setTimeout(r, 3500)); // Time per metric
            }

            // Step 2: Charts/Recap
            setStep(2);
            await new Promise(r => setTimeout(r, 6000));

            // Step 3: Outro
            setStep(3);
            await new Promise(r => setTimeout(r, 4000));

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
                    <h1 className="studio-title">SUPER QUINTA</h1>
                    <p className="presents-text">PRESENTS</p>
                </div>
            )}

            {step === 1 && (
                <div className="scene metric-scene">
                    <div className="metric-highlight keyframe-pop">
                        <span className="metric-value">{data.metrics[currentMetric].value}</span>
                        <span className="metric-label">{data.metrics[currentMetric].title}</span>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="scene recap-scene">
                    <h2>SEASON RECAP</h2>
                    <div className="recap-grid">
                        <div className="recap-item">
                            <span>TOTAL DELIVERIES</span>
                            <div className="bar" style={{ width: '80%' }}></div>
                        </div>
                        <div className="recap-item">
                            <span>GROWTH</span>
                            <div className="bar" style={{ width: '95%' }}></div>
                        </div>
                        <div className="recap-item">
                            <span>SATISFACTION</span>
                            <div className="bar" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="scene outro-scene">
                    <h1>COMING SOON</h1>
                    <p>NEXT EPISODE: APRIL</p>
                </div>
            )}
        </div>
    );
};

export default PresentationOverlay;
