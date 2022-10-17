import React, {
  createContext,
  useState,
  useContext,
} from 'react';
import {Alert} from 'react-native';

export interface Recent {
  id: string;
  name: string;
  idprovider: string;
  photo: string;
  phone:string; 
  // avatar_url: string;
}
interface RecentContextData {
  getRecents: (id: string) => void;
  addRecent: (iduser: string, idprovider:string) => void;
  removeRecent: (id: string) => void;
  recents: Recent[];
}

const RecentContext = createContext<RecentContextData>({} as RecentContextData);

const RecentsProvider: React.FC = ({ children }) => {
  const [recents, setRecents] = useState<Recent[]>([]);

  function getRecents (id: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/recents/read/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "iduser": id
        })
      })
      .then(response => response.json())
      .then(data => {

        const {message} = data;
        if(message){
          Alert.alert("Error ao buscar favoritos")
        }else{
          const {recents: rec} = data;
          setRecents(oldState => [...rec]);
        }
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
  function removeRecent (id: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/recents/delete/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "id": id
        })
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })

      // getFavorites(id);
    // await AsyncStorage.multiSet([
    //   ['@Work:token', token],
    //   ['@Work:user', JSON.stringify(user)],
    // ]);

    // api.defaults.headers.authorization = `Bearer ${token}`;
    // console.log(user)
  };

  function addRecent (iduser: string, idprovider: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/recents/create/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "iduser":iduser,
          "idprovider": idprovider
      }
      )
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })

      // getFavorites(iduser);
    // await AsyncStorage.multiSet([
    //   ['@Work:token', token],
    //   ['@Work:user', JSON.stringify(user)],
    // ]);

    // api.defaults.headers.authorization = `Bearer ${token}`;
    // console.log(user)
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
    <RecentContext.Provider
      value={{  getRecents,removeRecent, addRecent, recents}}
    >
      {children}
    </RecentContext.Provider>
  );
};

function useRecents(): RecentContextData {
  const context = useContext(RecentContext);

  if (!context) {
    throw new Error('useRecent must be used within an AuthFavorite');
  }
  return context;
}

export { RecentsProvider, useRecents };