import { Play, Info } from 'lucide-react';
import './Hero.css';

const Hero = ({ title, subtitle, onPlay }) => {
    return (
        <div className="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <h1 className="hero-title">{title}</h1>
                <div className="hero-meta">
                    <span className="match-score">98% Match</span>
                    <span className="year">2026</span>
                    <span className="age-rating">L</span>
                    <span className="duration">1 Season</span>
                </div>
                <p className="hero-description">
                    {subtitle || "Prepare-se para os resultados mais impactantes do ano."}
                    <br />
                    Nesta edição especial, mergulhe nos números que definem o nosso sucesso.
                </p>
                <div className="hero-buttons">
                    <button className="btn btn-play" onClick={onPlay}>
                        <Play fill="black" size={24} /> Play
                    </button>
                    <button className="btn btn-info">
                        <Info size={24} /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
