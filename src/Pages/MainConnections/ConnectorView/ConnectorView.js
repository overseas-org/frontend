import React, { useEffect, useState } from 'react';
import ConnectorBox from '../ConnectorBox/ConnectorBox';
import { connector } from '../../../variables/services'
import './ConnectorView.css'

const ConnectorView = ({ filter, setEditMode, editObj, setEditObj }) => {
    
    const [connectors, setConnectors] = useState([]);

    function fetch_connectors () {
        const queryParams = new URLSearchParams({filter: filter}).toString();
        
        fetch(`${connector}/connections?${queryParams}`, {
                method: "GET",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (!res.ok) { 
                return res.json().then(data => {
                    throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
                }
                return res.json();
            })
            .then(data => {
                setConnectors(data);
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
        }

        function get_row(rows_amount, column) {
            const rows = [];
            for (let index = 0; index < rows_amount; index++){
                rows.push(
                    <ConnectorBox connector={connectors[column + index]} setEdit={setEditMode} setEditObj={setEditObj}/>
                )
            }
            return rows;
        }

        function get_columns(rows) {
            const colunms = [];
            for (let index = 0; index < connectors.length; index += rows) {
                colunms.push(
                <div className='connectors-view-column'>
                    {get_row(rows, index)}
                </div>);
                }
            return colunms;
        }
    
    useEffect(fetch_connectors, [filter]);
    return (
            <div className='connector-view-page'>
                <div className='connectors-view-columns-container'>
                    {get_columns(2)}
                </div>
            </div>
    );
};

export default ConnectorView;