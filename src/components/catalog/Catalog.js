import React, { useEffect, useState } from 'react';
import "./Catalog.css"
import SearchBar from '../SearchBar/SearchBar';
import CatalogView from './catalogView/catalogView';


const Catalog = ({ fetchUrl, goToNewObject, refresh, catalogBox=()=>{}, fetchArgs={} }) => {

    const [filter, setFilter] = useState("");

    return (
            <div className='catalog-page'>
                <div className='search-and-new'>
                    <SearchBar onSearch={setFilter}/>
                    <button onClick={goToNewObject} className='new-catalog-button glassmorphism'>+</button>
                </div>
                <CatalogView refresh={refresh} fetchUrl={fetchUrl} filter={filter} catalogBox={catalogBox} fetchArgs={fetchArgs}/>
            </div>
    );
};

export default Catalog;