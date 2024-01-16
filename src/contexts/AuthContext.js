import { useContext, useEffect, useState } from "react"
import React from 'react'
import { auth, db } from "../firebase"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function SignUp(email, name, password){
        return auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Add the user to Firestore
                const { user } = userCredential;
                return db.collection('users').doc(user.uid).set({
                    email: user.email,
                    name: name,
                });
            });
    }

    function Login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function Logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        Login,
        SignUp,
        Logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
  