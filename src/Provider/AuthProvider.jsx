import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export const AuthContext = createContext()

import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)
    const createAccount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {

        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe(); // Unsubscribe from the authentication state changes
        };
    }, []);
    const allInfo = {
        user,
        loading,
        createAccount,
        googleLogin,
        logOut
    }
    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;