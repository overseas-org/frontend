import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Connector from '../baseConnector';

import './AzureConnector.css'
import ExitButton from '../../../../../components/buttons/exit/ExitButton';
import ContinueButton from '../../../../../components/buttons/continue/ContinueButton';

const AzureConnector = ({ name, mode, id, exitWindow }) => {
    const { register, handleSubmit, getValues, setValue } = useForm({defaultValues: {
        client_secret: "",
        tenant_id: "",
        client_id: ""
      }})

    const connector = new Connector(name, id, mode, exitWindow, "Azure");

    const loadData = async() => {
        if (mode == "edit") {
        const data = await connector.loadData(getValues());
        Object.keys(data).forEach(key => {
            setValue(key, data[key])
        });
    }
    }

    useEffect(() => {loadData()} ,[])

    return (
        <form onSubmit={handleSubmit(connector.handleSubmit)} className="azure-connector-form connector-form glassmorphism">
            <ExitButton onClick={exitWindow}/>
            <div className='content'>
            <h1 className="form-title">Azure Connector</h1>
            <label className="form-label-input">
                    Tenant ID:
                    <input type="text" {...register('tenant_id', { required: false })}  className="form-input" />
                </label>
                <label className="form-label-input">
                    Client ID (App ID):
                    <input type="text" {...register('client_id', { required: false })}  className="form-input" />
                </label>
                <label className="form-label-input">
                    Client Secret:
                    <input type="text" {...register('client_secret', { required: false })}  className="form-input maskedInput" />
                </label>
            </div>
            <div className='form-buttons'>
                <ContinueButton text={mode} />
            {/* <button type="submit" className={`form-button ${connector.submitClass}`}>{connector.titleCase(connector.submitClass)}</button>
            <button onClick={connector.handleCancel} type="button" className={`form-button ${connector.cancelClass}`}>{connector.titleCase(connector.cancelClass)}</button> */}
            </div>
        </form>
    );
};

export default AzureConnector;
