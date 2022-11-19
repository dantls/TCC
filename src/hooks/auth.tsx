import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
interface User {
  id: string;
  name:string;
  email:string;
  phone:string;
  photo: string;
  street:string;
  district:string;
  city: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData():Promise<void>{
      
        const [
          user] = await AsyncStorage.multiGet([
            '@Work:user']);

        if (
          user[1]) {
          setData({
             user: JSON.parse(user[1])});
        }
        setLoading(false);
    }
    loadStorageData();

  },[])

  const signIn = useCallback(async ({ email, password }) => {
    try{
    const response = await api.post('https://api-flash-services.herokuapp.com/src/Routes/login/',JSON.stringify( {
      email,
      password,
    }),{
      headers: {
          'Content-Type': 'application/json',
      }
  });

    const user = response.data;

    await AsyncStorage.multiSet([
      ['@Work:user', JSON.stringify(user)]
    ])

    setData({ 
      user });
    }catch(error){
      Alert.alert('Usuário/Senha incorretos.');
    }

  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@Work:user');
    }
    catch(exception) {
        console.log(exception)
    }

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Work:user', JSON.stringify(user));
      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut,loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };