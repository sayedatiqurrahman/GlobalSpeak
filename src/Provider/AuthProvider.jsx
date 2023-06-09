import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    
    const allInfo = {

    }
    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;