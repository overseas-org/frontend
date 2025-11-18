import React, { useEffect, useState } from 'react';

import './CatalogView.css'

const CatalogView = ({ fetchUrl, filter, catalogBox, fetchArgs, refresh}) => {
    
    const [objs, setObjs] = useState([]);
    const [cursor, setCursor] = useState(0);
    function fetch_objs () {
        const queryParams = new URLSearchParams({filter: filter, ...fetchArgs}).toString();
        fetch(`${fetchUrl}?${queryParams}`, {
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
                setObjs(data);
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
        }

        function get_row(rows_amount, column) {
            const rows = [];
            for (let row = 0; row < rows_amount; row++){
                if (column + row < objs.length) {
                    rows.push(
                        catalogBox(objs[column + row])
                    )
                }
            }
            return rows;
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
            }

        function moveBack() {
             if (cursor > 0) {
                    setCursor(cursor - 6);
                }
        }

        async function moveForward() {
            if (cursor + 6 < objs.length) {
                    setCursor(cursor + 6);
                }
        }

        function get_columns(rows) {
            const colunms = [];
            for (let index = cursor; index < cursor + 6; index += rows) {
                colunms.push(
                <div >
                    {get_row(rows, index)}
                </div>);
                }
            return colunms;
        }
    
    useEffect(fetch_objs, [filter, refresh]);
    return (
            <div className='catalog-view-page'>
                <div className='catalogs-view-columns-container'>
                    {get_columns(2)}
                </div>
                {  objs.length > 6 &&
                    <div className='move'>
                        <div onClick={moveBack} className='move-back'>{"<"}</div>
                        <label>{(cursor / 6) + 1}/{Math.ceil(objs.length / 6)}</label>
                        <div onClick={moveForward} className='move-forward'>{">"}</div>
                    </div>
                }
            </div>
    );
};

export default CatalogView;