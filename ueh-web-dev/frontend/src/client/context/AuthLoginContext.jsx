import React, { createContext, useState } from 'react';

const AuthLoginContext = createContext();
export default AuthLoginContext

export const AuthLoginProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <AuthLoginContext.Provider value={{ showLogin, setShowLogin }}>
            {children}
        </AuthLoginContext.Provider>
    );
};
