import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Row from './Row';
import DashboardSection from './DashboardSection';
import PresentationOverlay from './PresentationOverlay';
import './NetflixTheme.css';

const NetflixTheme = ({ data }) => {
    const [showPresentation, setShowPresentation] = useState(false);

    return (
        <div className="netflix-container">
            {showPresentation && (
                <PresentationOverlay
                    data={data}
                    onClose={() => setShowPresentation(false)}
                />
            )}
            <Header />
            <Hero
                title={data.title}
                subtitle={data.subtitle}
                onPlay={() => setShowPresentation(true)}
            />
            <div className="content-layer">
                <Row title="Estatísticas do Mês" items={data.metrics} />
                <DashboardSection />
            </div>
        </div>
    );
};

export default NetflixTheme;
