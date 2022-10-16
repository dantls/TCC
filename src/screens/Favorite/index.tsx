import React, {useState, useEffect, useCallback, useMemo} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useFavorites } from '@hooks/favorites';
import { useAuth } from '@hooks/auth';
import {
  Container,
  Content,
  Title,
  FavoritesList,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
} from './styles';


export interface Provider {
  id: number;
  name: string;
  email:string
  photo: string;
}

export function Favorite({ navigation }){
  const {getFavorites,removeFavorite, favorites} = useFavorites(); 
  const {user} = useAuth(); 



  const [isFavorite, setIsFavorite] = useState(false);
    
  const toggleFavorite = useCallback(async (id: string) => {
    // Toggle if food is favorite or not
    // setIsFavorite(!isFavorite);
    removeFavorite(id)
    getFavorites(user.id)

  }, [isFavorite]);


  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites(user.id)
    })
  }, [])

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );



  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
        {/* <Content> */}
        {favorites &&
          (
            <FavoritesList
            data={favorites}
            keyExtractor={favorite => favorite.id}
            ListHeaderComponent={
              <ProvidersListTitle>Profissionais Favoritos</ProvidersListTitle>
            }
            renderItem={({ item: favorite }) => (
              <ProviderContainer
                // onPress={() => navigateToCreateAppointment(provider.id)}
              >
                <ProviderAvatar source={{ uri: favorite.photo }} />
                <ProviderInfo>
                  <ProviderName>{favorite.name}</ProviderName> 
                  <ProviderMeta>
                    <Icon name="phone" size={14} color="#FF9000" />
                    <ProviderMetaText>{favorite.phone}</ProviderMetaText>
                  </ProviderMeta>                      
                </ProviderInfo>
                
                 
                <MaterialIcon
                    name="favorite"
                    size={24}
                    color="#FF9000"
                    onPress={() => toggleFavorite(favorite.id)}
                />
              </ProviderContainer>
            )}
          />
          )
        }
           
        {/* </Content> */}

        
      </KeyboardAvoidingView>
    </Container>
  )
}