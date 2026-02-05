import Card from './Card';
import './Row.css';

const Row = ({ title, items }) => {
    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>
            <div className="row-container">
                <div className="row-slider">
                    {items.map((item, index) => (
                        <Card key={item.id || index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Row;
