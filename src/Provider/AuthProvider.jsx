import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
export const AuthContext = createContext()

import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios'
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)
    //    Create account with email and password
    const createAccount = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login with email and password
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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
            if (currentUser) {
                axios.post('https://summercampgs.vercel.app/jwt', { email: currentUser?.email }).then(data => {
                    localStorage.setItem('token', data.data.token)
                    setLoading(false);
                })
            } else {
                localStorage.removeItem('token')
                setLoading(false);
            }
        });

        return () => {
            unsubscribe(); // Unsubscribe from the authentication state changes
        };
    }, []);
    const allInfo = {
        user,
        auth,
        loading,
        setLoading,
        createAccount,
        googleLogin,
        loginWithEmail,
        logOut
    }
    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;