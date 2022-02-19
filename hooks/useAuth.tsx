import { View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import {auth} from '../firebase'
interface Props{
  children:React.ReactNode
}

const AuthContext = createContext({});

const config ={
    androidClientId:"Enter Your Own Android Client Id",
    scopes:["profile","email"],
    permissions:["public_profile","email","gender","location"]
}

export const AuthProvider:React.FC<Props>=({children})=> {
  const initial:any = null;
  const [error,setError] = useState(null);
  const [user,setUser] = useState(initial);
  
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
      }else{
        setUser(initial);
      }
    })
  },[])

  const signInWithGoogle = async () => {
     await Google.logInAsync(config).then(async (logInResult)=>{
        if(logInResult.type === 'success'){
           const {idToken,accessToken} = logInResult;
           const credential = GoogleAuthProvider.credential(idToken,accessToken)
           await signInWithCredential(auth,credential);
        }
        return Promise.reject();
    }).catch(error=>setError(error));
  }

  const logout=()=>{
    signOut(auth).catch(e=>setError(e))
  }
  return (
    <AuthContext.Provider value={{user,logout,signInWithGoogle,}}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
  return useContext(AuthContext);
}