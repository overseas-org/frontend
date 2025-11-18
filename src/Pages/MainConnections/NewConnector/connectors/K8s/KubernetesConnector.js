import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Connector from '../baseConnector';

import './KubernetesConnector.css'
import ExitButton from '../../../../../components/buttons/exit/ExitButton';
import ContinueButton from '../../../../../components/buttons/continue/ContinueButton';

const KubernetesConnector = ({ name, mode, id, exitWindow }) => {
    const { register, handleSubmit, getValues, setValue } = useForm({defaultValues: {
        kubeconfig_file: {}
      }})

    const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // This is the base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file); // Convert the file to base64
    });
    };

    const connector = new Connector(name, id, mode, exitWindow, "K8s");

    const onSubmit = async (data) => {
        if (Object.keys(data.kubeconfig_file).length !== 0){
            data.kubeconfig_filename = data.kubeconfig_file[0].name
            data.kubeconfig_file = await getBase64(data.kubeconfig_file[0]);
        }
        connector.handleSubmit(data);
    }

    // useEffect(() => {loadData()} ,[])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="kubernetes-connector-form connector-form glassmorphism">
            <ExitButton/>
            <div className='content'>
            <h1 className="form-title">Kubernetes Connector</h1>
                        <label className="form-label">
                            Kubeconfig File:
                            <input {...register('kubeconfig_file', { required: false })} type='file' className="form-file-input" />
                        </label>
            </div>
            <div className='form-buttons'>
                <ContinueButton text={mode}/>
            {/* <button type="submit" className={`form-button ${connector.submitClass}`}>{connector.titleCase(connector.submitClass)}</button>
            <button onClick={connector.handleCancel} type="button" className={`form-button ${connector.cancelClass}`}>{connector.titleCase(connector.cancelClass)}</button> */}
            </div>
        </form>
    );
};

export default KubernetesConnector;
