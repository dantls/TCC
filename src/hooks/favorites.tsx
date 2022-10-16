import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import {Alert} from 'react-native';

export interface Favorite {
  id: string;
  name: string;
  idprovider: string;
  photo: string;
  phone:string; 
  // avatar_url: string;
}
interface FavoriteContextData {
  getFavorites: (id: string) => void;
  addFavorite: (iduser: string, idprovider:string) => void;
  removeFavorite: (id: string) => void;
  favorites: Favorite[];
}

const FavoriteContext = createContext<FavoriteContextData>({} as FavoriteContextData);

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  // const [loading, setLoading] = useState(true);

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

  function getFavorites (id: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/favorites/read/", {
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
          const {favorites: fav} = data;
          setFavorites(oldState => [...fav]);
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
  function removeFavorite (id: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/favorites/delete/", {
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

  function addFavorite (iduser: string, idprovider: string) {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/favorites/create/", {
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
    <FavoriteContext.Provider
      value={{ getFavorites,removeFavorite, addFavorite, favorites}}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

function useFavorites(): FavoriteContextData {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorite must be used within an AuthFavorite');
  }
  return context;
}

export { FavoritesProvider, useFavorites };