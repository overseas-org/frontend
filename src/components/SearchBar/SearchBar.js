import React, { useState } from 'react';
import './SearchBar.css'



const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div class="search-container">
            <input onChange={handleSearch} type="text" placeholder="Search..." class="search-input glassmorphism"/>
            <button class="search-button glassmorphism">
                <img className='icon' src={require("../../img/icons/search.png")} alt="search Icon"/>
            </button>
        </div>

        
    );
};

export default SearchBar;