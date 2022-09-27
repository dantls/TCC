import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
//  token: string;
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
          // token,
          user] = await AsyncStorage.multiGet([
            //'@Work:token',
            '@Work:user']);

        if (//token[1] && 
          user[1]) {
          setData({//token:token[1],
             user: JSON.parse(user[1])});
        }
        setLoading(false);
    }
    loadStorageData();

  },[])

  const signIn = useCallback(async ({ email, password }) => {
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
      // ['@Work:token', token],
      ['@Work:user', JSON.stringify(user)]
    ])

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ 
     // token, 
      user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      // 'Work:token',
      'Work:user'
    ]);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Work:user', JSON.stringify(user));
      setData({
        //token: data.token,
        user,
      });
    },
    [setData, 
      //data.token
    ],
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