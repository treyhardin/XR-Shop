import { createContext, useContext, useState } from "react";

export const ControlLockContext = createContext({});

export function ContextProvider({ children }) {

    // Should be false
    const [ isLocked, setLocked ] = useState(false);

    function printText() {
        console.log('Text')
    }

    return (
        <ControlLockContext.Provider value={{ isLocked, setLocked, printText }}>
            {children}
        </ControlLockContext.Provider>
    )


}
