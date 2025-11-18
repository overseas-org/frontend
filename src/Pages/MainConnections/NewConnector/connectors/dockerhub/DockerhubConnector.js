import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Connector from '../baseConnector';

import './DockerhubConnector.css'
import ExitButton from '../../../../../components/buttons/exit/ExitButton';
import ContinueButton from '../../../../../components/buttons/continue/ContinueButton';

const DockerhubConnector = ({ name, mode, id, exitWindow }) => {
    const { register, handleSubmit, getValues, setValue } = useForm({defaultValues: {
        token: "",
        username: ""
      }})

    const connector = new Connector(name, id, mode, exitWindow, "Dockerhub");

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
        <form onSubmit={handleSubmit(connector.handleSubmit)} className="dockerhub-connector-form connector-form glassmorphism">
            <ExitButton onClick={exitWindow}/>
            <div className='content'>
            <h1 className="form-title">Dockerhub Connector</h1>
                <label className="form-label">
                    Username:
                    <input type="text" {...register('username', { required: false })}  className="form-input" />
                </label>
                <label className="form-label">
                    PAT Token:
                    <input type="text" {...register('token', { required: false })}  className="form-input maskedInput" />
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

export default DockerhubConnector;
