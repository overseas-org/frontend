import React, { useState } from 'react';
import "./ServiceNavbar.css";

const ServiceNavbar = ({ setPage }) => {
    const [selectedPage, setSelectedPage] = useState("info");

    function goToPage(page) {
        setSelectedPage(page);
        setPage(page);
    }

    return (
        <nav className='navbar'>
            <ul>
                <li className={selectedPage == "info" ? 'selected': ""} onClick={() => goToPage('info')}>Info</li>
                <li className={selectedPage == "components" ? 'selected': ""} onClick={() => goToPage('components')}>Components</li>
                <li className={selectedPage == "endpoints" ? 'selected': ""} onClick={() => goToPage('endpoints')}>endpoints</li>
            </ul>
        </nav>
    );
};

export default ServiceNavbar;