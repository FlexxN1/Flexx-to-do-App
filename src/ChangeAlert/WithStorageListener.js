import React from 'react';

function withStorageListener(WrappedComponent){
    return function WrapperComponentWithStorageListener(){
        const [storageChange, setStorageChange] = React.useState(false);

        return(
            <WrappedComponent 
                show={storageChange} 
                toggleShow={setStorageChange}    
            />
        ) ;
    }
};

export { withStorageListener };