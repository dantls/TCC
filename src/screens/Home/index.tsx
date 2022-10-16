import React, {useState, useEffect, useCallback, useMemo} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { KeyboardAvoidingView, Platform } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from '@hooks/auth';
// import { OccupationButton } from '../../components/OccupationButton';
// import { Provider } from '../Provider';
import { Header } from '@src/components/Header/Index';

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
  
  // const [loadOccupations, setLoadOccupations] = useState<OccupationsProps[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [occupationsSelected, setOccupationsSelected] = useState(0); 
  
  
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

    setProviders([...formattedProviders]);

  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    
  }, [navigation]);  
  
  
  
  
  // function handleOccupationSelected (occupation: number){
  //   setOccupationsSelected(occupation);
  //   console.log(occupationsSelected)
  //   if(occupation === 0){
  //     return setFilteredPlants(plants)
  //   }
  
  //   const filtered = plants.filter(plant => plant.environments.includes(environment))
  
  //   setFilteredPlants(filtered);
  
  // }
  
  const navigateToProviderDetails = useCallback((providerId: string) => {
    navigation.navigate('ProviderDetails', {providerId})
  },[navigation.navigate]);
  
  return(
    <Container>
    <Header />
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding': undefined}
    >
    <Content>
    
    {/* <FlatList
    data={loadOccupations}
    keyExtractor={(item) => String(item.name)}
    renderItem={({item})=>(
      <OccupationButton 
      title={item.name}
      active={item.id === occupationsSelected}
      onPress={()=>{handleOccupationSelected(Number(item.id))}}
      />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        height: 40,
        justifyContent:'center',
        paddingBottom: 5,
        paddingRight: 30,
        marginLeft: 32,
        marginVertical: 24,
      }}
    /> */}
    
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
      
      
      </KeyboardAvoidingView>
      </Container>
      )
    }