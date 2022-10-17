import React, {useState, useEffect, useCallback, useMemo} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRecents } from '@hooks/recents';
import { useAuth } from '@hooks/auth';
import {
  Container,
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

export function Recent({ navigation }){
  const {getRecents,removeRecent, recents} = useRecents(); 
  const {user} = useAuth(); 
  const [isFavorite, setIsFavorite] = useState(false);
    
  const toggleRecent = useCallback(async (id: string) => {
    // Toggle if food is favorite or not
    // setIsFavorite(!isFavorite);
    removeRecent(id)
    getRecents(user.id)

  }, [isFavorite]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRecents(user.id)
    })
  }, [])



  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
        {/* <Content> */}
        {recents &&
          (
            <FavoritesList
            data={recents}
            keyExtractor={recent => recent.id}
            ListHeaderComponent={
              <ProvidersListTitle>Recentes</ProvidersListTitle>
            }
            renderItem={({ item: recent }) => (
              <ProviderContainer
                // onPress={() => navigateToCreateAppointment(provider.id)}
              >
                <ProviderAvatar source={{ uri: recent.photo }} />
                <ProviderInfo>
                  <ProviderName>{recent.name}</ProviderName> 
                  <ProviderMeta>
                    <Icon name="phone" size={14} color="#FF9000" />
                    <ProviderMetaText>{recent.phone}</ProviderMetaText>
                  </ProviderMeta>                      
                </ProviderInfo>
                
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