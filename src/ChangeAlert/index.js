import React from 'react';
import { withStorageListener } from './WithStorageListener'   

function ChangeAlert({ show, toggleShow}){
    if(show){
     return <p> Hubo cambios</p>
    }else {
        return null
    }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export { ChangeAlertWithStorageListener };