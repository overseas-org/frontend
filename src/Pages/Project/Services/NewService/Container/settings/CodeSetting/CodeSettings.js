import { useEffect, useState } from 'react';
import Framework from './Framework/Framework';

const CodeSettings = ({ serviceName, setCode, next, back }) => {

    const [languageVar, setLanguageVar] = useState("Python")
    const [frameworkSetting, setFrameworkSetting] = useState({
        framework_type: ""
    })
    console.log(`languageVar: ${languageVar}`)
    return (
        <div>
            <button className='back-button top' onClick={back}>←</button>
            <h1>Code Settings</h1>
            <form>
                <div>
                    <label >Language:</label>
                    <select onChange={(e) =>
                            setLanguageVar(e.target.value)
                        }>
                        <option>Python</option>
                    </select>
                </div>
                <Framework language={languageVar} frameworkSetting={frameworkSetting} setFramework={setFrameworkSetting}/>
                <button onClick={()=>{
                    setCode(languageVar, frameworkSetting)
                    // setCodeLanguage(languageVar);
                    // setFramework(frameworkSetting);
                    next()}}>next</button>
            </form>
        </div>
    );
};

export default CodeSettings;