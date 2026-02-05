import { Search, Bell, User } from 'lucide-react';
import './Header.css';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="logo">NETFLIX</div>
            <nav className="nav-links">
                <a href="#" className="active">Home</a>
                <a href="#">TV Shows</a>
                <a href="#">Movies</a>
                <a href="#">Latest</a>
                <a href="#">My List</a>
            </nav>
            <div className="secondary-nav">
                <Search className="icon" size={24} />
                <Bell className="icon" size={24} />
                <div className="user-profile">
                    <User size={24} />
                </div>
            </div>
        </header>
    );
};

export default Header;
