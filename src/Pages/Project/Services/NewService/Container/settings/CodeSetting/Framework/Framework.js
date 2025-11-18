import React, { useEffect } from 'react';

const Framework = ({language, frameworkSetting, setFramework}) => {

    useEffect(()=>{
        setFramework({...frameworkSetting, framework_type: "Flask"})
    },[])
    return (
        <div>
            {language == "Python" && (
                <div>
                    <label>Framework:</label>
                    <select onChange={(e)=>{setFramework({...frameworkSetting, framework_type: e.target.value})}}>
                        <option>Flask</option>
                        <option>None</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default Framework;