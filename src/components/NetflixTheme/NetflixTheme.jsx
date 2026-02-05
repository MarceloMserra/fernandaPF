import Header from './Header';
import Hero from './Hero';
import Row from './Row';
import DashboardSection from './DashboardSection';
import './NetflixTheme.css';

const NetflixTheme = ({ data }) => {
    return (
        <div className="netflix-container">
            <Header />
            <Hero
                title={data.title}
                subtitle={data.subtitle}
            />
            <Row title="Estatísticas do Mês" items={data.metrics} />
            <DashboardSection />
        </div>
        </div >
    );
};

export default NetflixTheme;
