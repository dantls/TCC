import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  // token: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  // avatar_url: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut() : void;
  // updateUser(user: User): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function loadStorageData(): Promise<void> {
  //     const [token, user] = await AsyncStorage.multiGet([
  //       '@Work:token',
  //       '@Work:user',
  //     ]);
  //     if (token[1] && user[1]) {
  //       api.defaults.headers.authorization = `Bearer ${token[1]}`;

  //       setData({ token: token[1], user: JSON.parse(user[1]) });
  //     }
  //     setLoading(false);
  //   }
  //   loadStorageData();
  // }, []);

  function signIn (dados: SignInCredentials) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/login/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            "email": dados.email,
            "password": dados.password
        })
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })


    // await AsyncStorage.multiSet([
    //   ['@Work:token', token],
    //   ['@Work:user', JSON.stringify(user)],
    // ]);

    // api.defaults.headers.authorization = `Bearer ${token}`;
    // console.log(user)
  };

  function signOut () {
    // await AsyncStorage.multiRemove(['Work:user', 'Work:token']);

    setUser({} as AuthState);
  };

  // const updateUser = useCallback(
  //   async (user: User) => {
  //     await AsyncStorage.setItem('@Work:user', JSON.stringify(user));
  //     setData({
  //       token: data.token,
  //       user,
  //     });
  //   },
  //   [setData, data.token],
  // );

  return (
    <AuthContext.Provider
      value={{ loading, user, signIn , signOut}}
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