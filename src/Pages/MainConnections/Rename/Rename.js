import React, { useState } from 'react'
import { rename } from '../NewConnector/connectors/baseConnector'
import ContinueButton from '../../../components/buttons/continue/ContinueButton'
import CancelButton from '../../../components/buttons/cancel/CancelButton'
import './Rename.css'

export const Rename = ({ id, initial_name, back }) => {
    const [name, setName] = useState(initial_name)
    
    return (
        <div className="initial-window connector-form rename-form">
                <label>name:</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                <div className='buttons'>
                    <ContinueButton text='rename' onClick={()=>{rename(id, name); back()}}/>
                    <CancelButton onClick={back}/>
                </div>
            </div>
    )
    }
