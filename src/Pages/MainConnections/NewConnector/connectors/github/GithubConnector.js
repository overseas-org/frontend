import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Connector from '../baseConnector';


import './GithubConnector.css'
import CancelButton from '../../../../../components/buttons/cancel/CancelButton';
import ContinueButton from '../../../../../components/buttons/continue/ContinueButton';
import ExitButton from '../../../../../components/buttons/exit/ExitButton';

const GitHubConnector = ({ name, mode, id, exitWindow }) => {
    const [accountType, setAccountType] = useState("account")
    const [usePAT, setUsePAT] = useState(false)
    const [useApp, setUseApp] = useState(false)
    const { register, handleSubmit, getValues, setValue } = useForm({defaultValues: {
        pat: '',
        account: '',
        organization: '',
        app_id: '',
        installation_id: '',
        key_file: {},
      }})

    const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // This is the base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file); // Convert the file to base64
    });
    };

    const connector = new Connector(name, id, mode, exitWindow, "Github");

    const onSubmit = async (data) => {
        if (Object.keys(data.key_file).length !== 0){
            data.key_filename = data.key_file[0].name
            data.key_file = await getBase64(data.key_file[0]);
        }
        connector.handleSubmit(data);
    }

    const loadData = async() => {
        if (mode == "edit") {
        const data = await connector.loadData(getValues());
        console.log(data)
        Object.keys(data).forEach(key => {
            setValue(key, data[key])
        });
            if (data.pat) {
                setUsePAT(true);
            }
            if (data.installation_id || data.app_id || data.key_path) {
                setUseApp(true);
            }
        }
    }

    useEffect(() => {loadData()} ,[])

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="github-connector-form connector-form glassmorphism">
            <ExitButton/>
            <div className='content'>
                <div className='first-column column'>
                    <h1 className="form-title">GitHub Connector</h1>
                    <label className="form-label">
                        Select Type:
                        <select name="accountType" value={accountType} onChange={(e)=>setAccountType(e.target.value)} className="form-select">
                            <option value="account">Account</option>
                            <option value="organization">Organization</option>
                        </select>
                    </label>
                    {accountType === 'account' ? (
                        <label className="form-label-input">
                            Account:
                            <input autoComplete="off" {...register('account', { required: false })} type="text" className="form-input" />
                        </label>
                    ) : (
                        <label className="form-label-input">
                            Organization:
                            <input autoComplete="off" {...register('organization', { required: false })} type="text" className="form-input" />
                        </label>
                    )}

                    <div className='pat-container'>
                    <label className="form-label">
                        <input type="checkbox" name="usePAT" checked={usePAT} onChange={(e)=>{setUsePAT(e.target.checked)}}  className="form-checkbox" />
                        Use PAT
                    </label>
                    {usePAT && (
                        <label className="form-label">
                            PAT Token:
                            <input {...register('pat', { required: false })} type="text"  className="form-input maskedInput" />
                        </label>
                    )}
                    </div>
                </div>
                <div className='second-column column'>
                <label className="form-label">
                    <input type="checkbox" name="useApp" checked={useApp} onChange={(e)=>{setUseApp(!useApp)}} className="form-checkbox" />
                    Use App
                </label>
                {useApp && (
                    <>
                        <label className="form-label-input">
                            App ID:
                            <input {...register('app_id', { required: false })} type="text" className="form-input" />
                        </label>
                        <label className="form-label-input">
                            Installation ID:
                            <input {...register('installation_id', { required: false })} type="text"  className="form-input" />
                        </label>
                        <label className="form-label">
                            PEM File:
                            <input {...register('key_file', { required: false })} type='file' className="form-file-input" />
                        </label>
                    </>
                )}
                </div>
            </div>
            <div className='form-buttons'>
                <ContinueButton text={mode} />
                {/* <CancelButton onClick={connector.handleCancel}/> */}
            </div>
            {/* <div className='form-buttons'>
                <button type="submit" className={`form-button ${connector.submitClass}`}>{connector.titleCase(connector.submitClass)}</button>
                <CancelButton onClick={connector.handleCancel} type="button" className={`form-button ${connector.cancelClass}`}>{connector.titleCase(connector.cancelClass)}</button>
            </div> */}
        </form>
    );
};

export default GitHubConnector;
