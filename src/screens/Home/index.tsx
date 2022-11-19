import React, {useState, useEffect, useCallback} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import { useAuth } from '@hooks/auth';
import { Header } from '@src/components/Header/Index';
import { Input } from '@src/components/Input';

import {
  Container,
  Content,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderMeta,
  ProviderMetaText,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  SearchArea
} from './styles';
import api from '@src/services/api';



interface OccupationsProps {
  id: number;
  name: string
}

export interface Provider {
  id: number;
  name: string;
  email:string
  photo: string;
  isFavorite?: boolean;
}

export interface Favorite {
  id: number;
  name: string;
  idprovider: number;
  photo: string;
  phone:string; 
  // avatar_url: string;
}

export function Home({ navigation }){
  const {user} = useAuth(); 
  
  const [providers, setProviders] = useState<Provider[]>([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText === '') {
      loadData();
    } else {
      setProviders(
        providers.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...providers];

    newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    setProviders(newList);
  };
  
  async function loadData(){

    const [ responseFavorites,responseProviders ] = await Promise.all([
      api.post("/favorites/read/", {iduser: String(user.id)}), 
      api.post("/provider/getall/")
    ]);
 
   
    const formattedProviders = responseProviders.data.providers.map((provider:Provider) => {
      const favorite = responseFavorites.data.favorites.find( item => item.idprovider == provider.id);
      if(favorite){
        provider.isFavorite = true;
        return provider;
      }else{
        provider.isFavorite = false;
        return provider
      }
    });

    let newList = [...formattedProviders];

    newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    

    setProviders([...newList]);

  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    
  }, [navigation]);  
  
    
  const navigateToProviderDetails = useCallback((providerId: string) => {
    navigation.navigate('ProviderDetail', {providerId})
  },[navigation.navigate]);
  
  return(
    <Container>
    <Header />

    <SearchArea>
        <Input
          placeholder="Pesquise uma pessoa"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity 
          onPress={handleOrderClick} 
          style={{
            width: 32,
            marginRight: 30,
          }}
        >
          <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </SearchArea>

    <Content>
   
        {providers &&(
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          ListHeaderComponent={
          <ProvidersListTitle>Profissionais</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
          onPress={() => navigateToProviderDetails(provider.id)}
          >
          <ProviderAvatar source={{ uri: provider.photo }} />
          <ProviderInfo>
          <ProviderName>{provider.name}</ProviderName>
          <ProviderMeta>
          <Icon name="calendar" size={14} color="#FF9000" />
          <ProviderMetaText>Segunda à sábado</ProviderMetaText>
          </ProviderMeta>
          
          <ProviderMeta>
          <Icon name="clock" size={14} color="#FF9000" />
          <ProviderMetaText>8h às 18h</ProviderMetaText>
          </ProviderMeta>
          </ProviderInfo>
          <MaterialIcon
          name={provider.isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color="#FF9000"
          // onPress={() => toggleFavorite(provider.id)}
          />
          </ProviderContainer>
          )}
          />

      )}
      </Content>
      
      
      </Container>
      )
    }