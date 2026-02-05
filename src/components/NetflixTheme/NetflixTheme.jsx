import Header from './Header';
import Hero from './Hero';
import Row from './Row';
import './NetflixTheme.css';

const NetflixTheme = ({ data }) => {
    return (
        <div className="netflix-container">
            <Header />
            <Hero
                title={data.title}
                subtitle={data.subtitle}
            />
            <div className="content-layer">
                <Row title="Estatísticas do Mês" items={data.metrics} />
            </div>
        </div>
    );
};

export default NetflixTheme;
