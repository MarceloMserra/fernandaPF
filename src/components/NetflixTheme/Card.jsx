import { PlayCircle, PlusCircle, ThumbsUp, ChevronDown } from 'lucide-react';
import './Card.css';

const Card = ({ item, index }) => {
    return (
        <div className="card">
            <div className="card-image-box">
                <div className="card-content-display">
                    <span className="card-value">{item.value}</span>
                    <span className="card-label">{item.title}</span>
                </div>
            </div>

            <div className="card-info">
                <div className="card-actions">
                    <div className="left-actions">
                        <PlayCircle className="icon-btn highlight" size={30} fill="white" />
                        <PlusCircle className="icon-btn" size={30} />
                        <ThumbsUp className="icon-btn" size={30} />
                    </div>
                    <div className="right-actions">
                        <ChevronDown className="icon-btn" size={30} />
                    </div>
                </div>

                <div className="card-meta">
                    <span className="match">98% Match</span>
                    <span className="rating">L</span>
                    <span className="duration">24m</span>
                </div>

                <div className="card-genres">
                    <ul>
                        <li>{item.subtext || "Resultados"}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Card;
