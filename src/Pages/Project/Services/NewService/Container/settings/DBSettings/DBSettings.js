import React, { useEffect, useState } from 'react';

const DBSettings = ({serviceName, setDb, back, next}) => {

    const [includeDb, setIncludeDb] = useState(false);
    const [settings, setSetting] = useState({
        db_type: "KubernetesDeployment",
        db_flavor: "mysql",
        root_password: "",
        include_autoScale: "false",
        min_replicas: "1",
        max_replicas: "1",
        include_pv: "true",
        pv_storage_class: "local-path",
        pv_storage_path: `/data/dbs-local-storage/${serviceName}`,
        pv_mount_path: "/var/lib/mysql",
        storage_amount: "1Gi"
    })


    // const updateDbFlavor = (e) => {
    //     const value = e.target.value
    //     let newsettings = {}
    //     newsettings["db_flavor"] = value
        
    //     if (!(value in settings)) {
    //         newsettings[value] = {}
    //     }
    //     if (value == "mysql") {
    //         newsettings[value] ={
    //             username: "root",
    //             password:""
    //         }
    //     }
    //     const { [settings.db_type]: _, ...filteredSettings } = settings;
    //     setSetting({...filteredSettings, ...newsettings})
    // }

    // const updateDbType = (e) => {
    //     const value = e.target.value
    //     let newsettings = {}
    //     newsettings["db_type"] = value
        
    //     if (!(value in settings)) {
    //         newsettings[value] = {}
    //     }
    //     const { [settings.db_infra_type]: _, ...filteredSettings } = settings;
    //     setSetting({...filteredSettings, ...newsettings})
    // }


    // useEffect(()=>{
        // if (includeDb) {
        //     let newsettings = {}
        //     if (!('db_type' in settings)) {
        //         newsettings["db_type"] = "mysql"
        //         newsettings["mysql"] = {
        //             username: "root",
        //             password:""
        //         }
        //     }
        //     if (!('db_infra_type' in settings)) {
        //         newsettings["db_infra_type"] = "k8s-deployment"
        //         newsettings["k8s-deployment"] = {}
        //     }
            
        //     setSetting({...settings, ...newsettings})
        // }
        
    // },[includeDb])
    console.log(settings);
    return (
        <div>
              <button className='back-button top' onClick={back}>←</button>
            <div>
                <input checked={includeDb} value={includeDb} onChange={() => setIncludeDb(!includeDb)} type='checkbox'/>
                <label>Include DB</label>
            </div>
            {includeDb && 
                <div>
                    <select onChange={(flavor)=>setSetting({...settings, db_flavor: flavor.target.value})}>
                        <option value="mysql">MySQL</option>
                        <option value="postgress">postgress</option>
                        <option value="redis">redis</option>
                    </select>
                    <div>
                        <label>db location</label>
                        <select onChange={(type)=>setSetting({...settings, db_type: type.target.value})}>
                            <option value="KubernetesDeployment">k8s deployment</option>
                            <option value="clouddb">db as cloud sevice</option>
                            <option value="external">external db</option>
                        </select>
                    </div>
                    { settings.db_flavor == "mysql" && <div>
                        <label>db credentials</label>
                        {/* <div>
                            <label>username:</label>
                            <input value={settings[settings.db_type].username} type='text' onChange={(e)=>{setSetting({...settings, [settings.db_type]: {...settings[settings.db_type], username: e.target.value}})}}/>
                        </div> */}
                        <div>
                            <label>root password:</label>
                            <input value={settings.root_password} type='text' className='maskedInput' onChange={e=>setSetting({...settings, root_password: e.target.value})}/>
                        </div>
                    </div>}
                </div>}
                <button onClick={()=>{if (includeDb) {setDb(settings)} else {setDb({})};next()}}>next</button>
        </div>
    );
};

export default DBSettings;