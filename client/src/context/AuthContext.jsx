import {createContext,useContext,useEffect,useState} from 'react';
import api from '../services/api';
const C=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);useEffect(()=>{const t=localStorage.getItem('tr_token');if(!t){setLoading(false);return}api.get('/auth/me').then(r=>setUser(r.data.data)).catch(()=>localStorage.removeItem('tr_token')).finally(()=>setLoading(false))},[]);const login=async(email,password)=>{const r=await api.post('/auth/login',{email,password});localStorage.setItem('tr_token',r.data.data.token);setUser(r.data.data.user);return r.data.data.user};const logout=()=>{localStorage.removeItem('tr_token');setUser(null)};return <C.Provider value={{user,loading,login,logout}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);
